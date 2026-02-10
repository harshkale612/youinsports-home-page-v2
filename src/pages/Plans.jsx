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
  const [currencyInfo, setCurrencyInfo] = useState({ code: 'USD', symbol: '$' });
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
        setCurrencyInfo({ code: 'USD', symbol: '$' });
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
      basic: { yearly: 2999, monthlyEq: 250 },
      premium: { yearly: 6999, monthly: 799, monthlyEq: 583 }
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
          price: currentPricing.basic.monthlyEq.toFixed(2),
          totalYearly: currentPricing.basic.yearly.toFixed(2),
          period: `billed at ${formatPrice(currentPricing.basic.yearly, currencyInfo.code)}/yr`,
        },
        buttonText: `Subscribe Now - ${formatPrice(currentPricing.basic.yearly, currencyInfo.code)} / yearly`,
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
        buttonText: 'Start 30-Day Free Trial',
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
                <motion.div variants={itemVariants} style={{ width: '100%', display: 'flex' }}>
                  <Card
                    sx={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      bgcolor: theme.palette.mode === 'light' ? '#ffffff' : '#151e32',
                      border: `1px solid ${theme.palette.divider}`,
                      minHeight: { xs: 'auto', md: '600px' },
                      borderRadius: 4,
                      boxShadow: theme.palette.mode === 'light'
                        ? '0 10px 40px -10px rgba(0,0,0,0.05)'
                        : '0 10px 40px -10px rgba(0,0,0,0.2)',
                    }}
                  >
                    <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography
                        variant="h4"
                        fontWeight={800}
                        gutterBottom
                        sx={{ color: 'text.primary', mb: 3 }}
                      >
                        {plan.title}
                      </Typography>

                      <List sx={{ mb: 4, flexGrow: 1 }}>
                        {plan.features.map((feature) => (
                          <ListItem key={feature} disableGutters sx={{ py: 1 }}>
                            <ListItemIcon sx={{ minWidth: 32, color: '#418BCA' }}>
                              <MdCheckCircle size={20} />
                            </ListItemIcon>
                            <ListItemText
                              primary={feature}
                              primaryTypographyProps={{
                                variant: 'body1',
                                fontWeight: 500,
                                color: 'text.primary'
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
                              p: 2,
                              borderRadius: 2,
                              border: `2px solid ${theme.palette.secondary.main}`,
                              bgcolor: theme.palette.mode === 'light' ? 'rgba(242, 106, 39, 0.05)' : 'rgba(242, 106, 39, 0.1)',
                              position: 'relative',
                            }}
                          >

                            <Typography variant="body2" fontWeight={600} color="text.primary" mb={0.5} align="center">
                              Yearly
                            </Typography>
                            <Box display="flex" justifyContent="center" alignItems="baseline" gap={0.5}>
                              {!loading && (
                                <Typography variant="h5" fontWeight={800} color="text.primary">
                                  {formatPrice(plan.yearly.price, currencyInfo.code)}
                                </Typography>
                              )}
                              {loading && <CircularProgress size={20} />}
                            </Box>
                            <Typography variant="caption" color="text.secondary" display="block" align="center" mt={0.5}>
                              {plan.yearly.period}
                            </Typography>
                          </Box>
                        ) : (
                          <>
                            {/* Monthly Option */}
                            <Box
                              onClick={() => handleBillingSelect(planIndex, 'monthly')}
                              sx={{
                                flex: 1,
                                p: 2,
                                borderRadius: 2,
                                border: `2px solid ${selectedBilling[planIndex] === 'monthly'
                                  ? theme.palette.secondary.main
                                  : theme.palette.divider
                                  }`,
                                bgcolor: selectedBilling[planIndex] === 'monthly'
                                  ? (theme.palette.mode === 'light' ? 'rgba(242, 106, 39, 0.05)' : 'rgba(242, 106, 39, 0.1)')
                                  : 'transparent',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  borderColor: theme.palette.secondary.main,
                                  bgcolor: theme.palette.mode === 'light' ? 'rgba(242, 106, 39, 0.05)' : 'rgba(242, 106, 39, 0.1)',
                                },
                              }}
                            >
                              <Typography variant="body2" fontWeight={600} color="text.secondary" mb={0.5} align="center">
                                Monthly
                              </Typography>
                              <Box display="flex" justifyContent="center" alignItems="baseline" gap={0.5}>
                                <Typography variant="h6" fontWeight={800} color="text.primary">
                                  {formatPrice(plan.monthly.price, currencyInfo.code)}
                                </Typography>
                              </Box>
                              <Typography variant="caption" color="text.secondary" display="block" align="center">
                                {plan.monthly.period}
                              </Typography>
                            </Box>

                            {/* Yearly Option */}
                            <Box
                              onClick={() => handleBillingSelect(planIndex, 'yearly')}
                              sx={{
                                flex: 1,
                                p: 2,
                                borderRadius: 2,
                                border: `2px solid ${selectedBilling[planIndex] === 'yearly'
                                  ? '#418BCA'
                                  : theme.palette.divider
                                  }`,
                                bgcolor: selectedBilling[planIndex] === 'yearly'
                                  ? (theme.palette.mode === 'light' ? 'rgba(65, 139, 202, 0.05)' : 'rgba(65, 139, 202, 0.1)')
                                  : 'transparent',
                                cursor: 'pointer',
                                position: 'relative',
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                  borderColor: '#418BCA',
                                  bgcolor: theme.palette.mode === 'light' ? 'rgba(65, 139, 202, 0.05)' : 'rgba(65, 139, 202, 0.1)',
                                },
                              }}
                            >
                              <Chip
                                label="Save 20%"
                                size="small"
                                sx={{
                                  position: 'absolute',
                                  top: -10,
                                  right: -5,
                                  bgcolor: theme.palette.secondary.main,
                                  color: 'white',
                                  fontWeight: 700,
                                  fontSize: '0.65rem',
                                  height: 20,
                                }}
                              />
                              <Typography variant="body2" fontWeight={600} color="text.secondary" mb={0.5} align="center">
                                Yearly
                              </Typography>
                              <Box display="flex" justifyContent="center" alignItems="baseline" gap={0.5}>
                                <Typography variant="h6" fontWeight={800} color="text.primary">
                                  {formatPrice(plan.yearly.price, currencyInfo.code)}
                                </Typography>
                              </Box>
                              <Typography variant="caption" color="text.secondary" display="block" align="center">
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
                          py: 1.5,
                          fontSize: '1rem',
                          fontWeight: 700,
                          borderRadius: 2,
                          '&:hover': {
                            bgcolor: '#E05D1F',
                            transform: 'translateY(-2px)',
                          },
                        }}
                      >
                        {plan.buttonText}
                      </Button>
                      <Typography variant="caption" color="text.secondary" display="block" align="center" mt={2}>
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
