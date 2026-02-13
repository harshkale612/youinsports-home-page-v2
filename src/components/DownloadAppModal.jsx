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
import { FaApple } from 'react-icons/fa';

const GooglePlayIcon = () => (
    <svg viewBox="0 0 512 512" width="28" height="28" style={{ marginRight: '2px' }}>
        <path fill="#00D9FF" d="M80.3 32.4c-4.1 4.1-6.4 10.3-6.4 18.2v410.7c0 7.9 2.3 14.1 6.4 18.2l1.6 1.6L304.5 258.4v-4.8L81.9 30.8l-1.6 1.6z" />
        <path fill="#FFC107" d="M379.2 333.3L304.5 258.4v-4.8l74.7-74.9 1.6.9 88.5 50.3c25.3 14.3 25.3 37.9 0 52.3l-88.5 50.3-1.6.9z" />
        <path fill="#FF5252" d="M380.8 332.4L304.5 256 80.3 480.2c8.3 8.7 21.9 9.8 37.1 1.2l263.4-149z" />
        <path fill="#00D26A" d="M380.8 179.6L117.4 30.6c-15.2-8.6-28.8-7.5-37.1 1.2L304.5 256l76.3-76.4z" />
    </svg>
);

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
            <DialogTitle sx={{ m: 0, p: 1, display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        color: (theme) => theme.palette.grey[500],
                        '&:hover': {
                            color: (theme) => theme.palette.grey[700],
                        }
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

                <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 3,
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 2
                }}>
                    {/* App Store Button */}
                    <Button
                        onClick={handleAppStoreClick}
                        sx={{
                            bgcolor: '#000000',
                            color: '#ffffff',
                            borderRadius: '12px',
                            border: '1px solid rgba(255,255,255,0.15)',
                            px: 2,
                            py: 1,
                            textTransform: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            width: { xs: '220px', sm: 'auto' },
                            minWidth: '200px',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                bgcolor: '#1a1a1a',
                                borderColor: 'rgba(255,255,255,0.3)',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                            }
                        }}
                    >
                        <FaApple size={30} style={{ marginBottom: '2px' }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Typography sx={{ fontSize: '0.65rem', lineHeight: 1, opacity: 0.9, fontWeight: 500 }}>
                                Download on the
                            </Typography>
                            <Typography sx={{ fontSize: '1.25rem', lineHeight: 1.2, fontWeight: 600 }}>
                                App Store
                            </Typography>
                        </Box>
                    </Button>

                    {/* Google Play Button */}
                    <Button
                        onClick={handlePlayStoreClick}
                        sx={{
                            bgcolor: '#000000',
                            color: '#ffffff',
                            borderRadius: '12px',
                            border: '1px solid rgba(255,255,255,0.15)',
                            px: 2,
                            py: 1,
                            textTransform: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            width: { xs: '220px', sm: 'auto' },
                            minWidth: '200px',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                bgcolor: '#1a1a1a',
                                borderColor: 'rgba(255,255,255,0.3)',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                            }
                        }}
                    >
                        <GooglePlayIcon />
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Typography sx={{ fontSize: '0.6rem', lineHeight: 1, opacity: 0.9, fontWeight: 700, letterSpacing: '0.5px' }}>
                                GET IT ON
                            </Typography>
                            <Typography sx={{ fontSize: '1.25rem', lineHeight: 1.2, fontWeight: 600 }}>
                                Google Play
                            </Typography>
                        </Box>
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default DownloadAppModal;
