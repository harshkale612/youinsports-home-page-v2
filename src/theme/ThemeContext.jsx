import React, { createContext, useContext, useMemo, useEffect } from 'react';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';

const ColorModeContext = createContext({ toggleColorMode: () => { } });

export const useColorMode = () => useContext(ColorModeContext);

export const ThemeContextProvider = ({ children }) => {
    const colorMode = useMemo(() => ({ toggleColorMode: () => { } }), []);

    useEffect(() => {
        const root = document.documentElement;
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
        root.style.setProperty('--card-shadow-hover', '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)');
        root.style.setProperty('--card-border-hover', '#d1d5db');
    }, []);

    const theme = useMemo(
        () => {
            let themeInstance = createTheme({
                palette: {
                    mode: 'light',
                    primary: {
                        main: '#418BCA',
                    },
                    secondary: {
                        main: '#F26A27',
                    },
                    background: {
                        default: '#f8fafc',
                        paper: '#ffffff',
                    },
                    text: {
                        primary: '#0f172a',
                        secondary: '#64748b',
                    },
                    divider: 'rgba(0, 0, 0, 0.08)',
                },
                shape: {
                    borderRadius: 16,
                },
                typography: {
                    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                    h1: { fontWeight: 800, fontSize: '3.5rem', lineHeight: 1.1, letterSpacing: '-0.02em' },
                    h2: { fontWeight: 800, fontSize: '2.5rem', lineHeight: 1.2, letterSpacing: '-0.01em' },
                    h3: { fontWeight: 700, fontSize: '2rem', letterSpacing: '-0.01em' },
                    h4: { fontWeight: 700, fontSize: '1.5rem' },
                    subtitle1: { fontWeight: 500, fontSize: '1.125rem', lineHeight: 1.6 },
                    button: { textTransform: 'none', fontWeight: 600 },
                },
                components: {
                    MuiCssBaseline: {
                        styleOverrides: {
                            body: {
                                transition: 'background-color 0.3s ease, color 0.3s ease',
                                backgroundColor: '#f8fafc',
                                scrollBehavior: 'smooth',
                            },
                        },
                    },
                    MuiContainer: {
                        defaultProps: { maxWidth: 'lg' },
                        styleOverrides: { root: { paddingLeft: '24px', paddingRight: '24px' } },
                    },
                    MuiAppBar: {
                        styleOverrides: {
                            root: {
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                color: '#0f172a',
                                boxShadow: 'none',
                                borderBottom: '1px solid rgba(226, 232, 240, 0.8)',
                                backdropFilter: 'blur(12px)',
                                transition: 'background-color 0.3s ease, border-color 0.3s ease',
                            },
                        },
                    },
                    MuiCard: {
                        styleOverrides: {
                            root: {
                                backgroundColor: '#ffffff',
                                border: '1px solid rgba(226, 232, 240, 0.8)',
                                borderRadius: 20,
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s ease',
                                '&:hover': {
                                    transform: 'translateY(-6px)',
                                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                                    borderColor: '#cbd5e1',
                                },
                            },
                        },
                    },
                    MuiPaper: {
                        styleOverrides: {
                            root: { backgroundImage: 'none', transition: 'background-color 0.3s ease, box-shadow 0.3s ease' },
                            rounded: { borderRadius: 16 },
                        },
                    },
                    MuiButton: {
                        defaultProps: { disableElevation: true },
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
                                '&:hover': { borderWidth: 2, backgroundColor: 'rgba(65, 139, 202, 0.05)' },
                            },
                        },
                    },
                    MuiTabs: {
                        styleOverrides: {
                            indicator: { height: 3, borderRadius: '3px 3px 0 0', backgroundColor: '#F26A27' },
                        },
                    },
                    MuiTab: {
                        styleOverrides: {
                            root: {
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '0.95rem',
                                color: '#64748b',
                                '&.Mui-selected': { color: '#0f172a' },
                            },
                        },
                    },
                    MuiChip: {
                        styleOverrides: {
                            root: { fontWeight: 500, borderRadius: 8 },
                            filled: { backgroundColor: '#f1f5f9' },
                        },
                    },
                    MuiOutlinedInput: {
                        styleOverrides: {
                            root: {
                                borderRadius: 12,
                                backgroundColor: '#fcfcfc',
                                transition: 'all 0.2s ease',
                                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#94a3b8' },
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#418BCA', borderWidth: 2 },
                            },
                            notchedOutline: { borderColor: '#e2e8f0' },
                        },
                    },
                    MuiInputBase: {
                        styleOverrides: {
                            root: { borderRadius: 12 },
                        },
                    },
                },
            });
            return responsiveFontSizes(themeInstance);
        },
        [],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};
