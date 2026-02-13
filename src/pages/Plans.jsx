import React, { useState, useEffect, useMemo } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Chip,
  CircularProgress,
} from '@mui/material';
import { MdCheckCircle } from 'react-icons/md';
import { motion } from 'framer-motion';
import {
  getUserCountry,
  formatPrice,
  getCurrencyInfo,
  getCurrencyLabel,
} from '../lib/utils';
import PricingFAQ, { PRICING_FAQ_ITEMS } from '../components/PricingFAQ';
import DownloadAppModal from '../components/DownloadAppModal';

const Plans = () => {
  const theme = useTheme();
  const [selectedBilling, setSelectedBilling] = useState({ 0: 'yearly', 1: 'yearly' });
  const [currencyInfo, setCurrencyInfo] = useState({ code: 'USD', symbol: 'USD ' });
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  // Fetch user's country and set currency on mount
  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        setLoading(true);
        const countryCode = await getUserCountry();
        const currency = getCurrencyInfo(countryCode);
        setCurrencyInfo(currency);
      } catch (error) {
        console.error('Error fetching currency:', error);
        setCurrencyInfo({ code: 'USD', symbol: 'USD ' });
      } finally {
        setLoading(false);
      }
    };

    fetchCurrency();
  }, []);

  const REGIONAL_PRICING = useMemo(() => ({
    CAD: {
      basic: { yearly: 48, monthlyEq: 4 },
      premium: { yearly: 119, monthly: 12.99, monthlyEq: 9.92 }
    },
    USD: {
      basic: { yearly: 36, monthlyEq: 3 },
      premium: { yearly: 89, monthly: 9.99, monthlyEq: 7.42 }
    },
    INR: {
      basic: { yearly: 99.99, monthlyEq: 8.33 },
      premium: { yearly: 479.00, monthly: 49.99, monthlyEq: 39.92 }
    }
  }), []);

  // Convert plans with current currency
  const plans = useMemo(() => {
    const currentPricing = REGIONAL_PRICING[currencyInfo.code] || REGIONAL_PRICING['USD'];

    return [
      {
        title: 'Basic',
        features: [
          'Blue Tick Verified Profile',
          'Access to Sponsorship Program',
        ],
        yearly: {
          price: currentPricing.basic.yearly.toFixed(2),
          totalYearly: currentPricing.basic.yearly.toFixed(2),
          period: '',
        },
        buttonText: 'Subscribe Now',
        buttonAction: () => setOpenModal(true),
      },
      {
        title: 'Premium',
        features: [
          'Blue Tick Verified Profile',
          'Access to Sponsorship Program',
          'Generate PGN with Scoresheet/Game Video',
          'Download PGN File',
          'Game Analysis',
          'Stockfish Analysis',
        ],
        monthly: {
          price: currentPricing.premium.monthly.toFixed(2),
          period: 'per month',
        },
        yearly: {
          price: currentPricing.premium.monthlyEq.toFixed(2),
          totalYearly: currentPricing.premium.yearly.toFixed(2),
          period: `billed at ${formatPrice(currentPricing.premium.yearly, currencyInfo.code)}/yr`,
        },
        buttonText: 'Subscribe Now',
        buttonAction: () => setOpenModal(true),
      },
    ];
  }, [currencyInfo.code, REGIONAL_PRICING]);

  const handleBillingSelect = (planIndex, billingType) => {
    setSelectedBilling(prev => ({
      ...prev,
      [planIndex]: billingType,
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <Box sx={{ bgcolor: 'background.default', pt: { xs: 8, md: 12 }, pb: 8, minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box textAlign="center" mb={8}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h1"
              gutterBottom
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 800,
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(45deg, #FFFFFF 30%, #418BCA 90%)'
                  : 'linear-gradient(45deg, #0C3042 30%, #418BCA 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                letterSpacing: '-0.02em',
              }}
            >
              YouInSports Premium
            </Typography>
            <Typography
              variant="h5"
              sx={{
                maxWidth: '700px',
                mx: 'auto',
                mb: 6,
                fontWeight: 500,
                color: '#F26A27',
                textShadow: theme.palette.mode === 'dark'
                  ? '0 0 20px rgba(242, 106, 39, 0.3)'
                  : 'none'
              }}
            >
              Unlock your full athletic potential.
            </Typography>


          </motion.div>
        </Box>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={4} justifyContent="center" alignItems="stretch">
            {plans.map((plan, planIndex) => (
              <Grid item xs={12} md={6} key={plan.title} sx={{ display: 'flex' }}>
                <motion.div
                  variants={itemVariants}
                  style={{ width: '100%', display: 'flex' }}
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Card
                    sx={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      bgcolor: theme.palette.mode === 'light' ? '#ffffff' : '#151e32',
                      border: theme.palette.mode === 'light'
                        ? '1px solid rgba(0,0,0,0.06)'
                        : '1px solid rgba(255,255,255,0.08)',
                      minHeight: { xs: 'auto', md: '600px' },
                      borderRadius: '24px',
                      boxShadow: theme.palette.mode === 'light'
                        ? '0 20px 40px -10px rgba(0,0,0,0.06)'
                        : '0 20px 40px -10px rgba(0,0,0,0.3)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        boxShadow: theme.palette.mode === 'light'
                          ? '0 30px 60px -12px rgba(65, 139, 202, 0.15)'
                          : '0 30px 60px -12px rgba(65, 139, 202, 0.15)',
                        borderColor: theme.palette.mode === 'dark' ? 'rgba(65, 139, 202, 0.3)' : 'transparent',
                      }
                    }}
                  >
                    <CardContent sx={{ p: { xs: 3, sm: 5 }, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography
                        variant="h4"
                        fontWeight={800}
                        gutterBottom
                        sx={{
                          color: 'text.primary',
                          mb: 3,
                          letterSpacing: '-0.01em',
                          fontSize: { xs: '2rem', md: '2.5rem' }
                        }}
                      >
                        {plan.title}
                      </Typography>

                      <List sx={{ mb: 4, flexGrow: 1 }}>
                        {plan.features.map((feature) => (
                          <ListItem key={feature} disableGutters sx={{ py: 1.5 }}>
                            <ListItemIcon sx={{ minWidth: 36, color: '#418BCA' }}>
                              <MdCheckCircle size={22} style={{ filter: 'drop-shadow(0 2px 4px rgba(65, 139, 202, 0.2))' }} />
                            </ListItemIcon>
                            <ListItemText
                              primary={feature}
                              primaryTypographyProps={{
                                variant: 'body1',
                                fontWeight: 500,
                                color: 'text.primary',
                                sx: { fontSize: '1.05rem' }
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>

                      {/* Billing Options */}
                      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
                        {/* For Basic plan, only show yearly option */}
                        {!plan.monthly ? (
                          <Box
                            sx={{
                              width: '100%',
                              p: 2.5,
                              borderRadius: '16px',
                              border: '2px solid #418BCA',
                              bgcolor: theme.palette.mode === 'light' ? 'rgba(65, 139, 202, 0.04)' : 'rgba(65, 139, 202, 0.08)',
                              position: 'relative',
                            }}
                          >

                            {planIndex !== 0 && (
                              <Chip
                                label="Save 20%"
                                size="small"
                                sx={{
                                  position: 'absolute',
                                  top: -12,
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  bgcolor: theme.palette.secondary.main,
                                  color: 'white',
                                  fontWeight: 800,
                                  fontSize: '0.7rem',
                                  height: 22,
                                  px: 1,
                                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                                }}
                              />
                            )}
                            <Typography variant="body2" fontWeight={700} color="text.primary" mb={0.5} align="center" sx={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em', opacity: 0.8 }}>
                              Yearly
                            </Typography>
                            <Box display="flex" justifyContent="center" alignItems="baseline" gap={0.5}>
                              {!loading && (
                                <Typography variant="h4" fontWeight={900} color="text.primary">
                                  {formatPrice(plan.yearly.price, currencyInfo.code)}
                                </Typography>
                              )}
                              {loading && <CircularProgress size={20} />}
                            </Box>
                            {plan.yearly.period && (
                              <Typography variant="caption" color="primary.main" display="block" align="center" mt={0.5} sx={{ fontWeight: 600 }}>
                                {plan.yearly.period}
                              </Typography>
                            )}
                          </Box>
                        ) : (
                          <>
                            {/* Monthly Option */}
                            <Box
                              onClick={() => handleBillingSelect(planIndex, 'monthly')}
                              sx={{
                                flex: 1,
                                p: 2,
                                borderRadius: '16px',
                                border: `2px solid ${selectedBilling[planIndex] === 'monthly'
                                  ? theme.palette.secondary.main
                                  : theme.palette.divider
                                  }`,
                                bgcolor: selectedBilling[planIndex] === 'monthly'
                                  ? (theme.palette.mode === 'light' ? 'rgba(242, 106, 39, 0.04)' : 'rgba(242, 106, 39, 0.08)')
                                  : 'transparent',
                                cursor: 'pointer',
                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                  borderColor: theme.palette.secondary.main,
                                  bgcolor: theme.palette.mode === 'light' ? 'rgba(242, 106, 39, 0.04)' : 'rgba(242, 106, 39, 0.08)',
                                  transform: 'translateY(-2px)'
                                },
                              }}
                            >
                              <Typography variant="body2" fontWeight={700} color={selectedBilling[planIndex] === 'monthly' ? "text.primary" : "text.secondary"} mb={0.5} align="center" sx={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                                Monthly
                              </Typography>
                              <Box display="flex" justifyContent="center" alignItems="baseline" gap={0.5}>
                                <Typography variant="h4" fontWeight={900} color={selectedBilling[planIndex] === 'monthly' ? "text.primary" : "text.secondary"}>
                                  {formatPrice(plan.monthly.price, currencyInfo.code)}
                                </Typography>
                              </Box>
                              <Typography variant="caption" color="text.secondary" display="block" align="center" sx={{ fontWeight: 500 }}>
                                {plan.monthly.period}
                              </Typography>
                            </Box>

                            {/* Yearly Option */}
                            <Box
                              onClick={() => handleBillingSelect(planIndex, 'yearly')}
                              sx={{
                                flex: 1,
                                p: 2,
                                borderRadius: '16px',
                                border: `2px solid ${selectedBilling[planIndex] === 'yearly'
                                  ? '#418BCA'
                                  : theme.palette.divider
                                  }`,
                                bgcolor: selectedBilling[planIndex] === 'yearly'
                                  ? (theme.palette.mode === 'light' ? 'rgba(65, 139, 202, 0.04)' : 'rgba(65, 139, 202, 0.08)')
                                  : 'transparent',
                                cursor: 'pointer',
                                position: 'relative',
                                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                '&:hover': {
                                  borderColor: '#418BCA',
                                  bgcolor: theme.palette.mode === 'light' ? 'rgba(65, 139, 202, 0.04)' : 'rgba(65, 139, 202, 0.08)',
                                  transform: 'translateY(-2px)'
                                },
                              }}
                            >
                              <Chip
                                label="Save 20%"
                                size="small"
                                sx={{
                                  position: 'absolute',
                                  top: -12,
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  bgcolor: theme.palette.secondary.main,
                                  color: 'white',
                                  fontWeight: 800,
                                  fontSize: '0.7rem',
                                  height: 22,
                                  px: 1,
                                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                                }}
                              />
                              <Typography variant="body2" fontWeight={700} color={selectedBilling[planIndex] === 'yearly' ? "text.primary" : "text.secondary"} mb={0.5} align="center" sx={{ textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                                Yearly
                              </Typography>
                              <Box display="flex" justifyContent="center" alignItems="baseline" gap={0.5}>
                                <Typography variant="h4" fontWeight={900} color={selectedBilling[planIndex] === 'yearly' ? "text.primary" : "text.secondary"}>
                                  {formatPrice(plan.yearly.price, currencyInfo.code)}
                                </Typography>
                              </Box>
                              <Typography variant="caption" color={selectedBilling[planIndex] === 'yearly' ? "#418BCA" : "text.secondary"} display="block" align="center" sx={{ fontWeight: 600 }}>
                                {plan.yearly.period}
                              </Typography>
                            </Box>
                          </>
                        )}
                      </Box>

                      <Button
                        fullWidth
                        variant="contained"
                        size="large"
                        onClick={plan.buttonAction}
                        sx={{
                          bgcolor: theme.palette.secondary.main,
                          color: 'white',
                          py: 2,
                          fontSize: '1.1rem',
                          fontWeight: 700,
                          borderRadius: '12px',
                          textTransform: 'none',
                          boxShadow: '0 10px 15px -3px rgba(242, 106, 39, 0.3)',
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            bgcolor: '#E05D1F',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 20px 25px -5px rgba(242, 106, 39, 0.4)',
                          },
                        }}
                      >
                        {plan.buttonText}
                      </Button>
                      <Typography variant="caption" color="text.secondary" display="block" align="center" mt={3} sx={{ opacity: 0.7 }}>
                        {planIndex === 0 ? "Pay today • Cancel anytime" : "No payment due today • Cancel anytime"}
                      </Typography>

                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        <PricingFAQ items={PRICING_FAQ_ITEMS} />

        {/* App Download Modal */}
        <DownloadAppModal open={openModal} onClose={() => setOpenModal(false)} />

      </Container >
    </Box >
  );
};

export default Plans;
