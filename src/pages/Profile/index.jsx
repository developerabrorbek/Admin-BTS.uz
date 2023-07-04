import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import { mainListItems } from "../../components/listItems";
import { deepOrange } from "@mui/material/colors";
import { useNavigate } from "react-router";
import { Avatar, Button } from "@mui/material";
import ProfileUpdateModal from "../../components/Modals/Profile/profile-update.modal";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme();



export default function ProfilePage() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
            <IconButton color="inherit" onClick={() => navigate("/orders")}>
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">{mainListItems}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />

          <Box sx={{ flexGrow: 1, padding: "12px" }}>
            <Grid container spacing={2} sx={{ justifyContent: "space-evenly" }}>
              <Grid item xs={5}>
                <Item>
                  <div className="personal-datum">
                    <div className="head flex items-center justify-between border-b pb-4 mb-4">
                      <div className="body flex items-center gap-x-4">
                        <Avatar
                          alt="Abrorbek Abdulxamidov"
                          src="/static/images/avatar/1.jpg"
                          sx={{ bgcolor: deepOrange[500] }}
                        />
                        <h3 className="font-bold text-[16px]">
                          Shaxsiy malumotlarim
                        </h3>
                      </div>
                      <ProfileUpdateModal/>
                    </div>
                    <div className="body p-3 ">
                      <h3 className="name text-left mb-6 font-semibold text-[15px] text-[#4b4a4a]">
                        Abrorbek Abdulxamidov
                      </h3>
                      <div className="number flex items-center gap-x-3 mb-2">
                        <span className="tel">Telefon:</span>
                        <p className="text-black">+99893 999 99 99</p>
                      </div>
                      <div className="role flex items-center gap-x-3">
                        <span>Role: </span>
                        <p className="text-black">Admin</p>
                      </div>
                    </div>
                  </div>
                </Item>
              </Grid>
              <Grid item xs={5}>
                <Item>
                  <div className="personal-datum">
                    <div className="head flex items-center justify-between border-b pb-4 mb-4">
                      <div className="body flex items-center gap-x-4">
                        <div className="card flex items-center justify-center p-2 border border-[#475569] rounded-full">
                          <CreditCardOutlinedIcon />
                        </div>
                        <h3 className="font-bold text-[16px]">
                          Mening kartalarim
                        </h3>
                      </div>
                      <Button variant="contained" color="success">
                        Karta qoshish
                      </Button>
                    </div>
                    <div className="body p-3 ">
                      <h3 className="name text-left mb-6 font-semibold text-[15px] text-[#4b4a4a]">
                        Kartalar:
                      </h3>
                      <div className="number flex items-center gap-x-3 mb-2">
                        <span className="tel text-[#1f2937] font-semibold">
                          Uzcard:{" "}
                        </span>
                        <p className="text-black">4444 4444 4444 4444</p>
                      </div>
                      <div className="number flex items-center gap-x-3 mb-2">
                        <span className="tel text-[#1f2937] font-semibold">
                          Visa:{" "}
                        </span>
                        <p className="text-black">1111 1111 1111 1111</p>
                      </div>
                    </div>
                  </div>
                </Item>
              </Grid>
              <Grid item xs={4}>
                <Item>xs=4</Item>
              </Grid>
              <Grid item xs={8}>
                <Item>xs=8</Item>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
