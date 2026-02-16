import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';
import { Categories } from './Categories';
import AdminProducts from './AdminProducts';
import Users from './Users';
import { useAuth } from '../Context/Authcontext';


const NAVIGATION = [
  {
    segment: 'users',
    title: 'Users',
    icon: <DashboardIcon />,
  },
  {
    segment: 'adminProducts',
    title: 'AdminProducts',
    icon: <DashboardIcon />,
  },
  {
    segment: 'categories',
    title: 'Categories',
    icon: <DashboardIcon />,
  },

];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 2,
        width:"95%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {pathname === '/users' && <Users/>}
        {pathname === '/adminProducts' && <AdminProducts/>}
          {pathname === '/categories' && <Categories/>}
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function Dashboard(props) {
  const { window } = props;
    const { user,logout} = useAuth()
  const [session, setSession] = React.useState({
    user:{
    name :user.username,
    email:user.email,
    image: '',
    }
  });

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: user.username,
            email: user.email,
            image: '',
          },
        });
      },
      signOut: () => {
        setSession(logout);
      },
    };
  }, []);

  const router = useDemoRouter('/users');

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    // Remove this provider when copying and pasting into your project.
    <DemoProvider window={demoWindow}>
      {/* preview-start */}
      <AppProvider
        session={session}
        authentication={authentication}
        navigation={NAVIGATION}
        router={router}
        theme={demoTheme}
        window={demoWindow}
      >
        <DashboardLayout>
          <DemoPageContent pathname={router.pathname} />
        </DashboardLayout>
      </AppProvider>
      {/* preview-end */}
    </DemoProvider>
  );
}

Dashboard.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default Dashboard;
