import React, { useContext, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { ColorModeContext } from '../utils/ToggleColorMode';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchMovie, selectCategory } from '../features/categorySlice';
import { fetchToken } from '../utils';

const useAlan = () => {
	const { setMode } = useContext(ColorModeContext);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		alanBtn({
			key: process.env.REACT_APP_ALAN_API,
			onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
				if (command === 'chooseGenre') {
					const foundGenre = genres.find(
						(g) => g.name.toLowerCase() === genreOrCategory.toLowerCase()
					);

					if (foundGenre) {
						navigate('/');
						dispatch(selectCategory(foundGenre.id));
					} else {
						const category = genreOrCategory.startsWith('top')
							? 'top_rated'
							: genreOrCategory;
						navigate('/');
						dispatch(selectCategory(category));
					}
				} else if (command === 'changeMode') {
					if (mode === 'light') {
						setMode('light');
					} else {
						setMode('dark');
					}
				} else if (command === 'login') {
					fetchToken();
				} else if (command === 'logout') {
					localStorage.clear();
					window.location.href = '/';
				} else if (command === 'search') {
					dispatch(searchMovie(query));
				}
			},
		});
	}, []);
};

export default useAlan;
