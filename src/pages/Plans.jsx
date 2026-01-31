import React, { useState } from 'react';
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
  Switch,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { MdCheckCircle, MdExpandMore, MdStar, MdInfoOutline } from 'react-icons/md';
import { motion } from 'framer-motion';

const Plans = () => {
  const theme = useTheme();
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      title: 'Starter',
      price: billingCycle === 'monthly' ? '0' : '0',
      description: 'Ideal for athletes beginning their professional journey.',
      features: [
        'Public Athlete Profile',
        'Basic Performance Stats',
        'Community Forum Access',
        'General Support',
        'Limited Video Uploads (3/mo)',
      ],
      cta: 'Start for Free',
      recommended: false,
    },
    {
      title: 'Pro',
      price: billingCycle === 'monthly' ? '1,499' : '1,199',
      description: 'Advanced tools to accelerate your athletic career.',
      features: [
        'Everything in Starter',
        'Enhanced Profile Themes',
        'AI-Powered Video Analysis',
        'Direct Agent Messaging',
        'Custom Goal Tracking',
        'Unlimited Video Uploads',
      ],
      cta: 'Go Pro Now',
      recommended: true,
    },
    {
      title: 'Elite',
      price: billingCycle === 'monthly' ? '3,999' : '3,199',
      description: 'Full-scale support for top-tier competitive athletes.',
      features: [
        'Everything in Pro',
        'Dedicated Talent Agent',
        'Sponsorship Portal Access',
        'Priority Technical Support',
        'Custom Brand Portfolio',
        'Early Feature Access',
      ],
      cta: 'Join Elite Elite',
      recommended: false,
    },
  ];

  const featuresComparison = [
    { feature: 'Public Profile', starter: true, pro: true, elite: true },
    { feature: 'Performance Stats', starter: 'Basic', pro: 'Advanced', elite: 'Full Suite' },
    { feature: 'AI Video Analysis', starter: false, pro: true, elite: true },
    { feature: 'Agent Networking', starter: false, pro: true, elite: true },
    { feature: 'Sponsorship Manager', starter: false, pro: false, elite: true },
    { feature: 'Dedicated Agent', starter: false, pro: false, elite: true },
    { feature: 'Support', starter: 'Standard', pro: 'Standard', elite: 'Priority 24/7' },
  ];

  const faqs = [
    {
      question: "Can I upgrade or downgrade my plan at any time?",
      answer: "Yes! You can change your plan at any time from your account settings. If you upgrade, the change will be immediate. If you downgrade, your current plan will remain active until the end of your billing period."
    },
    {
      question: "What's the difference between the monthly and annual plans?",
      answer: "Annual plans are billed once per year and offer a significant discount (up to 20%) compared to paying month-to-month."
    },
    {
      question: "How does the AI Video Analysis work?",
      answer: "Our advanced AI agents analyze your uploaded training and competition videos to provide insights on form, speed, and technique, helping you identify areas for improvement."
    },
    {
      question: "Is there a free trial for the Pro plan?",
      answer: "We offer a 14-day free trial for new users who want to explore Pro features before committing to a subscription."
    }
  ];

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
        <Box textAlign="center" mb={10}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h1"
              gutterBottom
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                background: theme.palette.mode === 'light'
                  ? 'linear-gradient(135deg, #0f172a 0%, #418BCA 100%)'
                  : 'linear-gradient(135deg, #f8fafc 0%, #418BCA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
              }}
            >
              Simple, Transparent Pricing
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ maxWidth: '700px', mx: 'auto', mb: 4, fontWeight: 400 }}
            >
              Choose the right plan to amplify your sports career. No hidden fees, just pure growth.
            </Typography>

            {/* Billing Toggle */}
            <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
              <Typography sx={{ fontWeight: billingCycle === 'monthly' ? 600 : 400, color: billingCycle === 'monthly' ? 'text.primary' : 'text.secondary' }}>
                Monthly
              </Typography>
              <Switch
                checked={billingCycle === 'annual'}
                onChange={() => setBillingCycle(prev => prev === 'monthly' ? 'annual' : 'monthly')}
                color="secondary"
              />
              <Typography sx={{ fontWeight: billingCycle === 'annual' ? 600 : 400, color: billingCycle === 'annual' ? 'text.primary' : 'text.secondary' }}>
                Annual <Chip label="Save 20%" size="small" component="span" sx={{ ml: 1, height: 20, bgcolor: 'secondary.main', color: 'white', fontWeight: 700, fontSize: '0.65rem' }} />
              </Typography>
            </Box>
          </motion.div>
        </Box>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={4} alignItems="flex-end">
            {plans.map((plan, index) => (
              <Grid item xs={12} md={4} key={plan.title}>
                <motion.div variants={itemVariants}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      overflow: 'visible',
                      ...(plan.recommended && {
                        border: `2px solid ${theme.palette.secondary.main}`,
                        transform: { md: 'scale(1.05)' },
                        zIndex: 1,
                      }),
                    }}
                  >
                    {plan.recommended && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: -16,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          bgcolor: 'secondary.main',
                          color: 'white',
                          px: 3,
                          py: 0.5,
                          borderRadius: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          boxShadow: '0 4px 10px rgba(242, 106, 39, 0.3)',
                        }}
                      >
                        <MdStar size={18} />
                        <Typography variant="caption" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>
                          Recommended
                        </Typography>
                      </Box>
                    )}

                    <CardContent sx={{ p: 4, flexGrow: 1 }}>
                      <Typography variant="h4" fontWeight={800} gutterBottom>
                        {plan.title}
                      </Typography>
                      <Box display="flex" alignItems="baseline" mb={2}>
                        <Typography variant="h2" fontWeight={800} color="primary.main">
                          ₹{plan.price}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" ml={1}>
                          /{billingCycle === 'monthly' ? 'mo' : 'mo'}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary" mb={4}>
                        {plan.description}
                      </Typography>

                      <Divider sx={{ mb: 4 }} />

                      <List sx={{ mb: 4 }}>
                        {plan.features.map((feature) => (
                          <ListItem key={feature} disableGutters sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 32, color: 'primary.main' }}>
                              <MdCheckCircle size={20} />
                            </ListItemIcon>
                            <ListItemText
                              primary={feature}
                              primaryTypographyProps={{ variant: 'body2', fontWeight: 500 }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </CardContent>

                    <Box sx={{ p: 4, pt: 0 }}>
                      <Button
                        fullWidth
                        variant={plan.recommended ? 'contained' : 'outlined'}
                        size="large"
                        sx={{
                          py: 1.5,
                          fontSize: '1rem',
                        }}
                      >
                        {plan.cta}
                      </Button>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Feature Comparison */}
        <Box sx={{ mt: 15, textAlign: 'center' }}>
          <Typography variant="h3" fontWeight={800} gutterBottom>
            Compare Features
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={6}>
            A detailed breakdown of everything you'll get in each plan.
          </Typography>

          <Box sx={{ position: 'relative', overflow: 'hidden', borderRadius: 0, border: `1px solid ${theme.palette.divider}` }}>
            <TableContainer component={Paper} sx={{
              borderRadius: 0,
              boxShadow: 'none',
              background: 'transparent',
              overflowX: 'auto',
              '::-webkit-scrollbar': { height: 6 },
              '::-webkit-scrollbar-track': { background: 'transparent' },
              '::-webkit-scrollbar-thumb': { background: theme.palette.divider, borderRadius: 0 }
            }}>
              <Table sx={{ minWidth: { xs: 600, md: '100%' } }}>
                <TableHead sx={{ bgcolor: theme.palette.mode === 'light' ? '#f8fafc' : '#0f172a' }}>
                  <TableRow>
                    <TableCell sx={{
                      fontWeight: 700,
                      position: 'sticky',
                      left: 0,
                      bgcolor: theme.palette.mode === 'light' ? '#f8fafc' : '#0f172a',
                      zIndex: 10,
                      borderBottom: `1px solid ${theme.palette.divider}`,
                      minWidth: 160
                    }}>
                      Features
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 800, color: 'text.secondary', fontSize: '0.9rem' }}>STARTER</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 800, color: 'primary.main', fontSize: '1.1rem' }}>PRO</TableCell>
                    <TableCell align="center" sx={{ fontWeight: 800, color: 'secondary.main', fontSize: '0.9rem' }}>ELITE</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {featuresComparison.map((row, index) => (
                    <TableRow
                      key={row.feature}
                      sx={{
                        bgcolor: index % 2 === 0 ? 'transparent' : (theme.palette.mode === 'light' ? 'rgba(0,0,0,0.02)' : 'rgba(255,255,255,0.02)'),
                        '&:hover': { bgcolor: theme.palette.mode === 'light' ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)' },
                        '&:last-child td, &:last-child th': { border: 0 }
                      }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          fontWeight: 600,
                          position: 'sticky',
                          left: 0,
                          bgcolor: index % 2 === 0
                            ? (theme.palette.mode === 'light' ? '#ffffff' : '#1e293b')
                            : (theme.palette.mode === 'light' ? '#fcfcfc' : '#1e293b'), // Fallback color matching row
                          bgcolor: theme.palette.mode === 'light' ? '#ffffff' : '#0b1121', // Actually better to use solid background for sticky
                          borderRight: `1px solid ${theme.palette.divider}`,
                          zIndex: 9
                        }}
                      >
                        {/* Ensure background matches visual row striping if possible, but solid is safer for sticky */}
                        <Box sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          bgcolor: index % 2 === 0 ? 'background.paper' : (theme.palette.mode === 'light' ? '#f8fafc' : '#111827'),
                          zIndex: -1
                        }} />
                        <Box sx={{ position: 'relative' }}>{row.feature}</Box>
                      </TableCell>
                      <TableCell align="center" sx={{ color: 'text.secondary' }}>
                        {typeof row.starter === 'boolean' ? (
                          row.starter ? <MdCheckCircle color={theme.palette.text.disabled} size={22} /> : <Typography color="text.disabled">—</Typography>
                        ) : <Typography fontWeight={500}>{row.starter}</Typography>}
                      </TableCell>
                      <TableCell align="center" sx={{ bgcolor: theme.palette.mode === 'light' ? 'rgba(65, 139, 202, 0.04)' : 'rgba(65, 139, 202, 0.1)' }}>
                        {typeof row.pro === 'boolean' ? (
                          row.pro ? <MdCheckCircle color={theme.palette.primary.main} size={24} /> : <Typography color="text.disabled">—</Typography>
                        ) : <Typography fontWeight={700} color="primary.main">{row.pro}</Typography>}
                      </TableCell>
                      <TableCell align="center">
                        {typeof row.elite === 'boolean' ? (
                          row.elite ? <MdCheckCircle color={theme.palette.secondary.main} size={22} /> : <Typography color="text.disabled">—</Typography>
                        ) : <Typography fontWeight={500}>{row.elite}</Typography>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>

        {/* FAQ Section */}
        <Box sx={{ mt: 15, maxWidth: '800px', mx: 'auto' }}>
          <Typography variant="h3" fontWeight={800} textAlign="center" gutterBottom>
            Frequently Asked Questions
          </Typography>
          <Typography variant="body1" color="text.secondary" textAlign="center" mb={6}>
            Got questions? We've got answers.
          </Typography>

          <Box>
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                sx={{
                  mb: 1,
                  '&:before': { display: 'none' },
                  boxShadow: 'none',
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: '12px !important',
                }}
              >
                <AccordionSummary
                  expandIcon={<MdExpandMore />}
                  sx={{ py: 1 }}
                >
                  <Typography fontWeight={600}>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ pt: 0, pb: 3 }}>
                  <Typography color="text.secondary">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>

        {/* Bottom CTA */}
        <Box
          sx={{
            mt: 15,
            p: { xs: 6, md: 10 },
            borderRadius: 10,
            textAlign: 'center',
            background: theme.palette.mode === 'light'
              ? '#ffffff'
              : 'linear-gradient(135deg, #0b1121 0%, #151e32 100%)',
            color: theme.palette.mode === 'light' ? 'text.primary' : '#f8fafc',
            position: 'relative',
            overflow: 'hidden',
            border: `1px solid ${theme.palette.divider}`,
            boxShadow: theme.palette.mode === 'light'
              ? '0 20px 40px -12px rgba(0, 0, 0, 0.08)'
              : '0 30px 60px -12px rgba(0, 0, 0, 0.4)',
          }}
        >
          {/* Decorative Glows - Only visible enough in dark mode or high-end displays */}
          <Box
            sx={{
              position: 'absolute',
              top: '-20%',
              left: '-10%',
              width: '500px',
              height: '500px',
              background: theme.palette.mode === 'light'
                ? 'radial-gradient(circle, rgba(65, 139, 202, 0.05) 0%, rgba(65, 139, 202, 0) 70%)'
                : 'radial-gradient(circle, rgba(65, 139, 202, 0.12) 0%, rgba(65, 139, 202, 0) 70%)',
              filter: 'blur(60px)',
              zIndex: 0,
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: '-20%',
              right: '-10%',
              width: '500px',
              height: '500px',
              background: theme.palette.mode === 'light'
                ? 'radial-gradient(circle, rgba(242, 106, 39, 0.05) 0%, rgba(242, 106, 39, 0) 70%)'
                : 'radial-gradient(circle, rgba(242, 106, 39, 0.12) 0%, rgba(242, 106, 39, 0) 70%)',
              filter: 'blur(60px)',
              zIndex: 0,
            }}
          />

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Typography
              variant="h3"
              fontWeight={800}
              gutterBottom
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                color: theme.palette.mode === 'light' ? 'primary.main' : 'inherit'
              }}
            >
              Ready to take your game to the next level?
            </Typography>
            <Typography
              variant="h6"
              sx={{
                mb: 6,
                opacity: 0.8,
                fontWeight: 400,
                maxWidth: '600px',
                mx: 'auto',
                color: theme.palette.text.secondary
              }}
            >
              Join thousands of athletes already using UinSports to build their future. Choose your plan and start your journey today.
            </Typography>
            <Box display="flex" justifyContent="center" gap={3} flexWrap="wrap">
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: 'primary.main',
                  color: 'white',
                  px: 5,
                  py: 1.8,
                  fontSize: '1rem',
                  '&:hover': { bgcolor: 'primary.dark', transform: 'translateY(-2px)' },
                }}
              >
                Create Free Profile
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: theme.palette.mode === 'light' ? 'primary.main' : 'rgba(255,255,255,0.3)',
                  color: theme.palette.mode === 'light' ? 'primary.main' : 'white',
                  px: 5,
                  py: 1.8,
                  fontSize: '1rem',
                  borderWidth: 2,
                  '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: theme.palette.mode === 'light' ? 'rgba(65, 139, 202, 0.05)' : 'rgba(255,255,255,0.05)',
                    transform: 'translateY(-2px)',
                    borderWidth: 2,
                  },
                }}
              >
                Explore Pro Features
              </Button>
            </Box>
          </Box>
        </Box>

      </Container>
    </Box>
  );
};

export default Plans;
