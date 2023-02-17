import { PersonOutline } from "@mui/icons-material";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";

const RightBar = () => {
  return (
    <Box sx={{ m: "50px", height: "100vh" }}>
      <Typography gutterBottom variant="h6" fontWeight={500}>
        Requests
      </Typography>
      <Stack direction="column" spacing={1}>
        <Stack direction="row" spacing={2}>
          <Avatar
            src="https://firebasestorage.googleapis.com/v0/b/chatbots-416f6.appspot.com/o/1676531990879pexels-tu%E1%BA%A5n-ki%E1%BB%87t-jr-1382730.jpg?alt=media&token=a4823e43-c66c-41a0-8b77-c4b597fb6ea3"
            sx={{ width: 45, height: 45 }}
          />
          <Box>
            <Typography variant="body2">
              <b>Sayaka Matsune</b> wants to add you to friends
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button size="small">Accept</Button>
              <Button size="small" sx={{ color: grey[500] }}>
                Decline
              </Button>
            </Stack>
          </Box>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Avatar
            src="https://material-ui.com/static/images/avatar/3.jpg"
            sx={{ width: 45, height: 45 }}
          />
          <Box>
            <Typography variant="body2">
              <b>Grace Augestine</b> wants to add you to friends
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button size="small">Accept</Button>
              <Button size="small" sx={{ color: grey[500] }}>
                Decline
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Stack>
      <Divider sx={{ mt: 3, mb: 3 }} />
      <Typography gutterBottom variant="h6" fontWeight={500}>
        Suggestions for you
      </Typography>
      <Stack direction="column" spacing={2}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Box display="flex" alignItems="center">
            <Avatar
              src="https://material-ui.com/static/images/avatar/1.jpg"
              sx={{ width: 45, height: 45, mr: 2 }}
            />
            <Box>
              <Typography fontWeight={500}>Remy Sharp</Typography>
              <Typography
                variant="body2"
                fontSize="12px"
                color="text.secondary"
              >
                Memphis, TN, US
              </Typography>
            </Box>
          </Box>
          <IconButton color="primary" sx={{ justifyContent: "flex-end" }}>
            <PersonOutline />
          </IconButton>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Box display="flex" alignItems="center">
            <Avatar
              src="https://material-ui.com/static/images/avatar/2.jpg"
              sx={{ width: 45, height: 45, mr: 2 }}
            />
            <Box>
              <Typography fontWeight={500}>Jack Stewart</Typography>
              <Typography
                variant="body2"
                fontSize="12px"
                color="text.secondary"
              >
                Newark, NJ, US
              </Typography>
            </Box>
          </Box>
          <IconButton color="primary" sx={{ justifyContent: "flex-end" }}>
            <PersonOutline />
          </IconButton>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Box display="flex" alignItems="center">
            <Avatar
              src="https://material-ui.com/static/images/avatar/4.jpg"
              sx={{ width: 45, height: 45, mr: 2 }}
            />
            <Box>
              <Typography fontWeight={500}>Lisa Golstein</Typography>
              <Typography
                variant="body2"
                fontSize="12px"
                color="text.secondary"
              >
                Fort Worth, TX, US
              </Typography>
            </Box>
          </Box>
          <IconButton color="primary" sx={{ justifyContent: "flex-end" }}>
            <PersonOutline />
          </IconButton>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Box display="flex" alignItems="center">
            <Avatar
              src="https://material-ui.com/static/images/avatar/5.jpg"
              sx={{ width: 45, height: 45, mr: 2 }}
            />
            <Box>
              <Typography fontWeight={500}>Martin Madrazo</Typography>
              <Typography
                variant="body2"
                fontSize="12px"
                color="text.secondary"
              >
                Los Angeles, CA, US
              </Typography>
            </Box>
          </Box>
          <IconButton color="primary" sx={{ justifyContent: "flex-end" }}>
            <PersonOutline />
          </IconButton>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Box display="flex" alignItems="center">
            <Avatar
              src="https://material-ui.com/static/images/avatar/6.jpg"
              sx={{ width: 45, height: 45, mr: 2 }}
            />
            <Box>
              <Typography fontWeight={500}>Shane Smith</Typography>
              <Typography
                variant="body2"
                fontSize="12px"
                color="text.secondary"
              >
                Little Rock, AR, US
              </Typography>
            </Box>
          </Box>
          <IconButton color="primary" sx={{ justifyContent: "flex-end" }}>
            <PersonOutline />
          </IconButton>
        </Box>
      </Stack>
      <Box sx={{ textAlign: "center", mt: 2, mb: 2 }}>
        <Button size="small">View all</Button>
      </Box>
      <Box>
        <Divider sx={{ mt: 3, mb: 4 }} />
        <Box
          sx={{
            backgroundColor: grey[100],
            p: "18px 0px 14px 18px",
            borderRadius: "20px",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <AvatarGroup max={8} spacing={10} sx={{ mb: 1 }}>
              <Avatar
                alt="Remy Sharp"
                src="https://material-ui.com/static/images/avatar/1.jpg"
                sx={{ width: 30, height: 30 }}
              />
              <Avatar
                alt="Travis Howard"
                src="https://material-ui.com/static/images/avatar/2.jpg"
                sx={{ width: 30, height: 30 }}
              />
              <Avatar
                alt="Cindy Baker"
                src="https://material-ui.com/static/images/avatar/3.jpg"
                sx={{ width: 30, height: 30 }}
              />
              <Avatar
                alt="Agnes Walker"
                src="https://material-ui.com/static/images/avatar/4.jpg"
                sx={{ width: 30, height: 30 }}
              />
              <Avatar
                alt="Trevor Henderson"
                src="https://material-ui.com/static/images/avatar/5.jpg"
                sx={{ width: 30, height: 30 }}
              />
              <Avatar
                alt="Trevor Henderson"
                src="https://material-ui.com/static/images/avatar/6.jpg"
                sx={{ width: 30, height: 30 }}
              />
              <Avatar
                alt="Trevor Henderson"
                src="https://material-ui.com/static/images/avatar/7.jpg"
                sx={{ width: 30, height: 30 }}
              />
              <Avatar
                alt="Trevor Henderson"
                src="https://material-ui.com/static/images/avatar/8.jpg"
                sx={{ width: 30, height: 30 }}
              />
            </AvatarGroup>
          </Box>
          <Stack direction="column">
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="h5" fontWeight={500}>
                184.3K
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Followers
              </Typography>
            </Stack>
            <Typography variant="body2" fontWeight={500}>
              Active now on your profile
            </Typography>
          </Stack>
        </Box>
        <Divider sx={{ mt: 4, mb: 4 }} />
        <Box>
          <Stack
            direction="row"
            sx={{ flexWrap: "wrap", rowGap: 1, columnGap: 3 }}
          >
            <Link href="#" underline="none">
              About
            </Link>
            <Link href="#" underline="none">
              Accessibility
            </Link>
            <Link href="#" underline="none">
              Help Center
            </Link>
            <Link href="#" underline="none">
              Privacy and Terms
            </Link>
            <Link href="#" underline="none">
              Advertising
            </Link>
            <Link href="#" underline="none">
              Business Services
            </Link>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default RightBar;
