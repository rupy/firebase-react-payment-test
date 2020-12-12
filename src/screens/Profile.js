
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import firebase from '../Firebase';

import SideMenu from '../components/SideMenu';
import CssBaseline from '@material-ui/core/CssBaseline';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
      },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
      },
}));

function Profile() {
  const classes = useStyles();
  const user = firebase.auth().currentUser;
  console.log(user);


  return (
    <div className={classes.root}>
        <CssBaseline />
        <SideMenu />
        <main className={classes.content}>

            <h1>プロフィール</h1>
            <h2>メールアドレス</h2>
            <p className="UserEmail">{user && user.email}</p>
            <p>メール認証：{user && user.emailVerified ? '認証済み': '未認証'}</p>
            <br/>
            <Link href="/">Homeへ</Link>
            <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
            facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
            gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
            donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
            adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
            Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
            imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
            arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
            donec massa sapien faucibus et molestie ac.
            </Typography>
            <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla
            facilisi etiam dignissim diam. Pulvinar elementum integer enim neque volutpat ac
            tincidunt. Ornare suspendisse sed nisi lacus sed viverra tellus. Purus sit amet volutpat
            consequat mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis risus sed
            vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra accumsan in. In
            hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
            tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin
            nibh sit. Ornare aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas
            accumsan lacus vel facilisis. Nulla posuere sollicitudin aliquam ultrices sagittis orci a.
            </Typography>
            </main>
    </div>
  );
}

export default Profile;