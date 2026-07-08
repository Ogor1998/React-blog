
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Typography,
    CircularProgress,
    Button
} from "@mui/material";
import { useAuth } from "../context/AuthContext";

export default function ProfileComponent({ profile, handleClick }) {
    const { currentUser } = useAuth();
    const allowedToEditProfile = profile._id === currentUser?._id;
    console.log(allowedToEditProfile)

    if (!profile) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <CircularProgress />
            </Box>
        );
    }


    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                mt: 5,
            }}
        >
            <Card sx={{ width: 500 }}>
                <CardContent>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            mb: 3,
                        }}
                    >
                        {allowedToEditProfile && <Button color='alert' variant="outlined" onClick={handleClick} sx={{ marginBottom: '10px' }}>Edit Profile</Button>}
                        <Avatar
                            src={profile.image}
                            alt={profile.username}
                            sx={{ width: 100, height: 100 }}
                        />

                        <Typography variant="h5" sx={{ mt: 2 }}>
                            {profile.username}
                        </Typography>
                    </Box>

                    <Typography variant="body1" gutterBottom>
                        <strong>First Name:</strong> {profile.firstname || "Not provided"}
                    </Typography>

                    <Typography variant="body1" gutterBottom>
                        <strong>Last Name:</strong> {profile.lastname || "Not provided"}
                    </Typography>

                    <Typography variant="body1" gutterBottom>
                        <strong>Email:</strong> {profile.email}
                    </Typography>

                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        Member since{" "}
                        {new Date(profile.createdAt).toLocaleDateString()}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}