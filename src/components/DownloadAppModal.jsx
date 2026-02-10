import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    IconButton,
    useTheme,
} from '@mui/material';
import { MdClose } from 'react-icons/md';
import { FaApple, FaGooglePlay } from 'react-icons/fa';

const DownloadAppModal = ({ open, onClose }) => {
    const theme = useTheme();

    const handleAppStoreClick = () => {
        // Updated with actual App Store URL
        window.open('https://apps.apple.com/us/app/youinsports/id1551076827', '_blank');
    };

    const handlePlayStoreClick = () => {
        // Updated with actual Play Store URL
        window.open('https://play.google.com/store/apps/details?id=com.uinsports', '_blank');
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: {
                    borderRadius: 3,
                    bgcolor: theme.palette.background.paper,
                    backgroundImage: 'none',
                    boxShadow: theme.palette.mode === 'dark' ? '0 8px 32px rgba(0,0,0,0.4)' : '0 8px 32px rgba(0,0,0,0.1)',
                }
            }}
        >
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" component="div" fontWeight={700}>
                    Download the App
                </Typography>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <MdClose />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ borderBottom: 'none', textAlign: 'center', py: 4 }}>
                <Typography variant="h5" gutterBottom fontWeight={600} sx={{ mb: 2 }}>
                    Experience the Full Power of YouInSports
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    This feature is available exclusively on our mobile app. Download now to unlock your full athletic potential!
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, justifyContent: 'center' }}>
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<FaApple size={24} />}
                        onClick={handleAppStoreClick}
                        sx={{
                            bgcolor: theme.palette.mode === 'dark' ? '#fff' : '#000',
                            color: theme.palette.mode === 'dark' ? '#000' : '#fff',
                            py: 1.5,
                            px: 3,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontSize: '1rem',
                            fontWeight: 600,
                            '&:hover': {
                                bgcolor: theme.palette.mode === 'dark' ? '#e0e0e0' : '#333',
                            },
                        }}
                    >
                        Download on the App Store
                    </Button>

                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<FaGooglePlay size={20} />}
                        onClick={handlePlayStoreClick}
                        sx={{
                            bgcolor: theme.palette.mode === 'dark' ? '#fff' : '#000',
                            color: theme.palette.mode === 'dark' ? '#000' : '#fff',
                            py: 1.5,
                            px: 3,
                            borderRadius: 2,
                            textTransform: 'none',
                            fontSize: '1rem',
                            fontWeight: 600,
                            '&:hover': {
                                bgcolor: theme.palette.mode === 'dark' ? '#e0e0e0' : '#333',
                            },
                        }}
                    >
                        Get it on Google Play
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default DownloadAppModal;
