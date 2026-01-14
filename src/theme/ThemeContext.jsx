import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';

const ColorModeContext = createContext({ toggleColorMode: () => { } });

export const useColorMode = () => useContext(ColorModeContext);

export const ThemeContextProvider = ({ children }) => {
    const [mode, setMode] = useState(() => {
        const savedMode = localStorage.getItem('colorMode');
        if (savedMode) return savedMode;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
                    const newMode = prevMode === 'light' ? 'dark' : 'light';
                    localStorage.setItem('colorMode', newMode);
                    return newMode;
                });
            },
        }),
        [],
    );

    useEffect(() => {
        const root = document.documentElement;
        if (mode === 'dark') {
            root.style.setProperty('--white', '#1e293b'); // Keeping for compatibility, but surfaces will be #151e32
            root.style.setProperty('--gray-50', '#0b1121'); // Deep navy background
            root.style.setProperty('--gray-100', '#151e32'); // Paper color
            root.style.setProperty('--gray-200', '#2dd4bf'); // Unused, keeping placeholder or specific border color
            root.style.setProperty('--gray-300', '#334155');
            root.style.setProperty('--gray-400', '#94a3b8');
            root.style.setProperty('--gray-500', '#94a3b8');
            root.style.setProperty('--gray-600', '#cbd5e1');
            root.style.setProperty('--gray-700', '#e2e8f0');
            root.style.setProperty('--gray-800', '#f1f5f9');
            root.style.setProperty('--gray-900', '#f8fafc');
            // Premium colored glow for dark mode
            root.style.setProperty('--card-shadow-hover', '0 20px 25px -5px rgba(65, 139, 202, 0.25), 0 10px 10px -5px rgba(65, 139, 202, 0.1)');
            root.style.setProperty('--card-border-hover', '#0C3042');
        } else {
            root.style.setProperty('--white', '#ffffff');
            root.style.setProperty('--gray-50', '#f9fafb');
            root.style.setProperty('--gray-100', '#f3f4f6');
            root.style.setProperty('--gray-200', '#e5e7eb');
            root.style.setProperty('--gray-300', '#d1d5db');
            root.style.setProperty('--gray-400', '#9ca3af');
            root.style.setProperty('--gray-500', '#6b7280');
            root.style.setProperty('--gray-600', '#4b5563');
            root.style.setProperty('--gray-700', '#374151');
            root.style.setProperty('--gray-800', '#1f2937');
            root.style.setProperty('--gray-900', '#111827');
            // Standard shadow for light mode
            root.style.setProperty('--card-shadow-hover', '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)');
            root.style.setProperty('--card-border-hover', '#d1d5db');
        }
    }, [mode]);

    const theme = useMemo(
        () => {
            let themeInstance = createTheme({
                palette: {
                    mode,
                    primary: {
                        main: '#418BCA',
                    },
                    secondary: {
                        main: '#F26A27',
                    },
                    background: {
                        default: mode === 'light' ? '#f8fafc' : '#0b1121', // Lighter gray for light mode depth, Deep Brand Navy for dark
                        paper: mode === 'light' ? '#ffffff' : '#151e32', // Deep Navy Paper
                    },
                    text: {
                        primary: mode === 'light' ? '#0f172a' : '#f8fafc', // Sharper dark text
                        secondary: mode === 'light' ? '#64748b' : '#94a3b8',
                    },
                    divider: mode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)',
                },
                shape: {
                    borderRadius: 16, // More modern rounded corners
                },
                typography: {
                    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                    h1: {
                        fontWeight: 800,
                        fontSize: '3.5rem',
                        lineHeight: 1.1,
                        letterSpacing: '-0.02em',
                    },
                    h2: {
                        fontWeight: 800,
                        fontSize: '2.5rem',
                        lineHeight: 1.2,
                        letterSpacing: '-0.01em',
                    },
                    h3: {
                        fontWeight: 700,
                        fontSize: '2rem',
                        letterSpacing: '-0.01em',
                    },
                    h4: {
                        fontWeight: 700,
                        fontSize: '1.5rem',
                    },
                    subtitle1: {
                        fontWeight: 500,
                        fontSize: '1.125rem',
                        lineHeight: 1.6,
                    },
                    button: {
                        textTransform: 'none',
                        fontWeight: 600,
                    },
                },
                components: {
                    MuiCssBaseline: {
                        styleOverrides: {
                            body: {
                                transition: 'background-color 0.3s ease, color 0.3s ease',
                                backgroundColor: mode === 'light' ? '#f8fafc' : '#0b1121',
                                scrollBehavior: 'smooth',
                            },
                        },
                    },
                    MuiContainer: {
                        defaultProps: {
                            maxWidth: 'lg',
                        },
                        styleOverrides: {
                            root: {
                                paddingLeft: '24px',
                                paddingRight: '24px',
                            },
                        },
                    },
                    MuiAppBar: {
                        styleOverrides: {
                            root: {
                                backgroundColor: mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(11, 17, 33, 0.8)', // Glassmorphism base
                                color: mode === 'light' ? '#0f172a' : '#f8fafc',
                                boxShadow: 'none',
                                borderBottom: mode === 'light'
                                    ? '1px solid rgba(226, 232, 240, 0.8)'
                                    : '1px solid rgba(30, 41, 59, 0.8)',
                                backdropFilter: 'blur(12px)',
                                transition: 'background-color 0.3s ease, border-color 0.3s ease',
                            },
                        },
                    },
                    MuiCard: {
                        styleOverrides: {
                            root: {
                                backgroundColor: mode === 'light' ? '#ffffff' : '#151e32',
                                border: mode === 'light' ? '1px solid rgba(226, 232, 240, 0.8)' : '1px solid rgba(30, 41, 59, 0.8)',
                                borderRadius: 20, // Modern curve
                                boxShadow: mode === 'light'
                                    ? '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)' // Subtle light shadow
                                    : '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)', // Deeper dark shadow
                                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-6px)',
                                    boxShadow: mode === 'light'
                                        ? '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                                        : '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
                                    borderColor: mode === 'light' ? '#cbd5e1' : '#334155',
                                },
                            },
                        },
                    },
                    MuiPaper: {
                        styleOverrides: {
                            root: {
                                backgroundImage: 'none', // Remove default MUI gradient in dark mode
                                transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                            },
                            rounded: {
                                borderRadius: 16,
                            },
                        },
                    },
                    MuiButton: {
                        defaultProps: {
                            disableElevation: true,
                        },
                        styleOverrides: {
                            root: {
                                borderRadius: 10,
                                fontWeight: 600,
                                padding: '10px 20px',
                                textTransform: 'none',
                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                            },
                            containedPrimary: {
                                background: 'linear-gradient(135deg, #F26A27, #418BCA)',
                                color: '#ffffff',
                                boxShadow: '0 4px 6px -1px rgba(65, 139, 202, 0.3), 0 2px 4px -1px rgba(65, 139, 202, 0.15)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #E05D1F, #307AB5)',
                                    boxShadow: '0 10px 15px -3px rgba(65, 139, 202, 0.4), 0 4px 6px -2px rgba(65, 139, 202, 0.2)',
                                    transform: 'translateY(-1px)',
                                },
                            },
                            outlined: {
                                borderWidth: 2,
                                '&:hover': {
                                    borderWidth: 2,
                                    backgroundColor: mode === 'light' ? 'rgba(65, 139, 202, 0.05)' : 'rgba(65, 139, 202, 0.1)',
                                },
                            },
                        },
                    },
                    MuiTabs: {
                        styleOverrides: {
                            indicator: {
                                height: 3,
                                borderRadius: '3px 3px 0 0',
                                backgroundColor: '#F26A27',
                            },
                        },
                    },
                    MuiTab: {
                        styleOverrides: {
                            root: {
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '0.95rem',
                                color: mode === 'light' ? '#64748b' : '#94a3b8',
                                '&.Mui-selected': {
                                    color: mode === 'light' ? '#0f172a' : '#f8fafc',
                                },
                            },
                        },
                    },
                    MuiChip: {
                        styleOverrides: {
                            root: {
                                fontWeight: 500,
                                borderRadius: 8,
                            },
                            filled: {
                                backgroundColor: mode === 'light' ? '#f1f5f9' : '#1e293b',
                            },
                        },
                    },
                    MuiOutlinedInput: {
                        styleOverrides: {
                            root: {
                                borderRadius: 12,
                                backgroundColor: mode === 'light' ? '#fcfcfc' : '#1e293b',
                                transition: 'all 0.2s ease',
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: mode === 'light' ? '#94a3b8' : '#64748b',
                                },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#418BCA',
                                    borderWidth: 2,
                                },
                            },
                            notchedOutline: {
                                borderColor: mode === 'light' ? '#e2e8f0' : '#334155',
                            },
                        },
                    },
                    MuiInputBase: {
                        styleOverrides: {
                            root: {
                                borderRadius: 12,
                            },
                        },
                    },
                },
            });
            return responsiveFontSizes(themeInstance);
        },
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};
