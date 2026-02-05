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
  convertPrice,
  formatPrice,
  getCurrencyInfo,
  getCurrencyLabel,
} from '../lib/utils';

// Base prices in CAD
const basePlans = [
    {
      title: 'Basic',
      features: [
        'Blue Tick Verified Profile',
        'Access to Sponsorship Program',
      ],
      monthly: {
        priceCAD: '5.00',
      },
      yearly: {
        priceCAD: '4.00',
        totalYearlyCAD: '48.00',
      },
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
        priceCAD: '12.99',
      },
      yearly: {
        priceCAD: '9.92',
        totalYearlyCAD: '119.00',
      },
    },
  ];

const Plans = () => {
  const theme = useTheme();
  const [selectedBilling, setSelectedBilling] = useState({ 0: 'yearly', 1: 'yearly' });
  // Default to USD for international visitors until we detect country
  const [currencyInfo, setCurrencyInfo] = useState({ code: 'USD', symbol: '$' });
  const [loading, setLoading] = useState(true);

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
        // Fallback to USD for international visitors
        setCurrencyInfo({ code: 'USD', symbol: '$' });
      } finally {
        setLoading(false);
      }
    };

    fetchCurrency();
  }, []);

  // Convert plans with current currency
  const plans = useMemo(() => {
    return basePlans.map(plan => ({
      ...plan,
      monthly: {
        ...plan.monthly,
        price: convertPrice(plan.monthly.priceCAD, currencyInfo.code),
        period: 'per month',
      },
      yearly: {
        ...plan.yearly,
        price: convertPrice(plan.yearly.priceCAD, currencyInfo.code),
        totalYearly: convertPrice(plan.yearly.totalYearlyCAD, currencyInfo.code),
        period: `billed at ${formatPrice(convertPrice(plan.yearly.totalYearlyCAD, currencyInfo.code), currencyInfo.code)}/yr`,
      },
    }));
  }, [currencyInfo.code]);

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
                color: 'text.primary',
                mb: 2,
              }}
            >
              YouInSports Premium
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ maxWidth: '700px', mx: 'auto', mb: 6, fontWeight: 400 }}
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
                        {planIndex === 0 ? (
                          <Box
                            sx={{
                              width: '100%',
                              p: 2,
                              borderRadius: 2,
                              border: `2px solid ${theme.palette.divider}`,
                              bgcolor: 'transparent',
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mb: 0.5 }}>
                              <Typography variant="body2" fontWeight={600} color="text.secondary">
                                Annual
                              </Typography>
                              {!loading && (
                                <Typography variant="caption" color="text.secondary">
                                  {getCurrencyLabel(currencyInfo.code)}
                                </Typography>
                              )}
                            </Box>
                            <Typography variant="h5" fontWeight={800} color="text.primary">
                              {loading ? (
                                <CircularProgress size={20} sx={{ color: 'text.primary' }} />
                              ) : (
                                formatPrice(plan.yearly.price, currencyInfo.code)
                              )}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
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
                                border: `2px solid ${
                                  selectedBilling[planIndex] === 'monthly' 
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
                              <Typography variant="body2" fontWeight={600} color="text.secondary" mb={0.5}>
                                Monthly
                              </Typography>
                              <Typography variant="h5" fontWeight={800} color="text.primary">
                                {loading ? (
                                  <CircularProgress size={20} sx={{ color: 'text.primary' }} />
                                ) : (
                                  formatPrice(plan.monthly.price, currencyInfo.code)
                                )}
                              </Typography>
                              {!loading && (
                                <Typography variant="caption" color="text.secondary">
                                  {getCurrencyLabel(currencyInfo.code)}
                                </Typography>
                              )}
                              <Typography variant="caption" color="text.secondary">
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
                                border: `2px solid ${
                                  selectedBilling[planIndex] === 'yearly' 
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
                                  top: -8,
                                  right: 8,
                                  bgcolor: theme.palette.secondary.main,
                                  color: 'white',
                                  fontWeight: 700,
                                  fontSize: '0.65rem',
                                  height: 20,
                                }}
                              />
                              <Typography variant="body2" fontWeight={600} color="text.secondary" mb={0.5}>
                                Yearly
                              </Typography>
                              <Typography variant="h5" fontWeight={800} color="text.primary">
                                {loading ? (
                                  <CircularProgress size={20} sx={{ color: 'text.primary' }} />
                                ) : (
                                  formatPrice(plan.yearly.price, currencyInfo.code)
                                )}
                              </Typography>
                              {!loading && (
                                <Typography variant="caption" color="text.secondary">
                                  {getCurrencyLabel(currencyInfo.code)}
                                </Typography>
                              )}
                              <Typography variant="caption" color="text.secondary">
                                {plan.yearly.period}
                              </Typography>
                            </Box>
                          </>
                        )}
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* CTA Button and Disclaimer */}
        <Box sx={{ mt: 6, textAlign: 'center', maxWidth: '600px', mx: 'auto' }}>
          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{
              bgcolor: theme.palette.secondary.main,
              color: 'white',
              py: 2,
              fontSize: '1.1rem',
              fontWeight: 700,
              borderRadius: 2,
              mb: 2,
              '&:hover': {
                bgcolor: '#E05D1F',
                transform: 'translateY(-2px)',
              },
            }}
          >
            Start 30-Day Free Trial
          </Button>
          <Typography variant="body2" color="text.secondary">
            No payment due today • Cancel anytime
          </Typography>
        </Box>

      </Container>
    </Box>
  );
};

export default Plans;
