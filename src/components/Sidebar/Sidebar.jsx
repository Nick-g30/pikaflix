import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Divider,
	List,
	ListItemText,
	ListSubheader,
	ListItemIcon,
	Box,
	CircularProgress,
	useTheme,
	ListItemButton,
} from '@mui/material';

import { GenreImg, LinkContainer, StyledLink } from './styles';
import { useGetGenresQuery } from '../../services/TMDB';
import { selectCategory } from '../../features/categorySlice';
import genreIcons from '../../assets/genres';
import { userSelector } from '../../features/authSlice';

const categories = [
	{ label: 'Popular', value: 'popular' },
	{ label: 'Top Rated', value: 'top_rated' },
	{ label: 'Upcoming', value: 'upcoming' },
];

const redLogo =
	'https://i.imgur.com/sZbe5Cc.png';
const blueLogo =
	'https://i.imgur.com/aSQzTox.png';

const Sidebar = ({ setMobileOpen }) => {
	const theme = useTheme();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const categoryId = useSelector((state) => state.currentCategory);
	const { data, isFetching } = useGetGenresQuery();

	useEffect(() => {
		setMobileOpen(false);
	}, [categoryId]);

	return (
		<>
			<LinkContainer onClick={() => navigate('/')}>
				<img
					src={theme.palette.mode === 'light' ? redLogo : blueLogo}
					alt='PikaFlix Logo'
					width="25"
				/>
			</LinkContainer>
			<Divider />
			<List>
				<ListSubheader>Categories</ListSubheader>
				{categories.map(({ label, value }) => (
					<StyledLink onClick={() => navigate('/')} key={value}>
						<ListItemButton onClick={() => dispatch(selectCategory(value))}>
							<ListItemIcon>
								<GenreImg src={genreIcons[label.toLowerCase()]} />
							</ListItemIcon>
							<ListItemText primary={label} />
						</ListItemButton>
					</StyledLink>
				))}
			</List>
			<Divider />
			<List>
				<ListSubheader>Genres</ListSubheader>
				{isFetching ? (
					<Box display={'flex'} justifyContent={'center'}>
						<CircularProgress />
					</Box>
				) : (
					data.genres.map(({ name, id }) => (
						<StyledLink onClick={() => navigate('/')} key={name}>
							<ListItemButton onClick={() => dispatch(selectCategory(id))}>
								<ListItemIcon>
									<GenreImg src={genreIcons[name.toLowerCase()]} />
								</ListItemIcon>
								<ListItemText primary={name} />
							</ListItemButton>
						</StyledLink>
					))
				)}
			</List>
		</>
	);
};

export default Sidebar;
