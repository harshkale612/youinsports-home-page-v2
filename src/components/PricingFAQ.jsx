import React, { useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  useTheme,
} from '@mui/material';
import { MdExpandMore } from 'react-icons/md';

/**
 * Lazy-loaded responsive YouTube embed.
 * Only mounts iframe when isVisible is true (e.g. when FAQ is expanded).
 */
function YouTubeEmbed({ videoUrl, isVisible, theme }) {
  if (!videoUrl || !isVisible) return null;

  const isDark = theme.palette.mode === 'dark';
  let embedSrc = videoUrl;
  if (typeof videoUrl === 'string' && videoUrl.includes('youtube')) {
    const match = videoUrl.match(/(?:embed\/|v=)([\w-]+)/);
    embedSrc = match ? `https://www.youtube.com/embed/${match[1]}` : videoUrl;
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        paddingBottom: '56.25%', // 16:9
        borderRadius: 2,
        overflow: 'hidden',
        mt: 2,
        bgcolor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.05)',
      }}
    >
      <iframe
        title="FAQ video"
        src={embedSrc}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </Box>
  );
}

/**
 * Renders FAQ answer content.
 * Supports: string, React node, or content object { text?, videoUrl? }.
 */
function AnswerContent({ answer, videoUrl, isExpanded, theme }) {
  let textContent = null;
  if (typeof answer === 'string') {
    textContent = answer;
  } else if (answer && typeof answer === 'object' && answer.text) {
    textContent = answer.text;
  } else if (React.isValidElement(answer)) {
    return (
      <>
        {answer}
        <YouTubeEmbed videoUrl={videoUrl} isVisible={isExpanded} theme={theme} />
      </>
    );
  }

  return (
    <>
      {textContent && (
        <Typography
          component="div"
          variant="body1"
          sx={{
            color: 'text.secondary',
            lineHeight: 1.7,
            '& p': { mb: 1.5 },
            '& p:last-child': { mb: 0 },
          }}
        >
          {textContent}
        </Typography>
      )}
      <YouTubeEmbed videoUrl={videoUrl} isVisible={isExpanded} theme={theme} />
    </>
  );
}

/**
 * Reusable FAQ section for pricing (or other) pages.
 * - items: array of { id, question, answer?, videoUrl? }
 *   - answer: string | ReactNode | { text: string }
 *   - videoUrl: optional; if present, lazy-loaded YouTube embed when panel is expanded
 * - title: section heading
 * - singleExpanded: if true, only one panel open at a time (default true)
 */
function PricingFAQ({
  items = [],
  title = 'Frequently Asked Questions',
  singleExpanded = true,
}) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panelId) => (event, isExpandedPanel) => {
    setExpanded(singleExpanded ? (isExpandedPanel ? panelId : false) : (prev) => (prev === panelId ? false : panelId));
  };

  return (
    <Box
      component="section"
      aria-label={title}
      sx={{
        mt: { xs: 10, md: 12 },
        maxWidth: 900,
        mx: 'auto',
      }}
    >
      <Box
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: 4,
          border: `1px solid ${theme.palette.divider}`,
          bgcolor: theme.palette.background.paper,
          boxShadow: theme.palette.mode === 'light'
            ? '0 20px 40px -18px rgba(0,0,0,0.10)'
            : '0 24px 48px -22px rgba(0,0,0,0.45)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle brand glows */}
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            top: '-30%',
            left: '-20%',
            width: 420,
            height: 420,
            background: theme.palette.mode === 'light'
              ? 'radial-gradient(circle, rgba(65, 139, 202, 0.12) 0%, rgba(65, 139, 202, 0) 70%)'
              : 'radial-gradient(circle, rgba(65, 139, 202, 0.18) 0%, rgba(65, 139, 202, 0) 70%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
        />
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            bottom: '-35%',
            right: '-20%',
            width: 480,
            height: 480,
            background: theme.palette.mode === 'light'
              ? 'radial-gradient(circle, rgba(242, 106, 39, 0.12) 0%, rgba(242, 106, 39, 0) 70%)'
              : 'radial-gradient(circle, rgba(242, 106, 39, 0.18) 0%, rgba(242, 106, 39, 0) 70%)',
            filter: 'blur(44px)',
            pointerEvents: 'none',
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h3"
            fontWeight={800}
            textAlign="center"
            gutterBottom
            sx={{
              color: 'text.primary',
              fontSize: { xs: '1.75rem', md: '2rem' },
              mb: 1.5,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            sx={{ maxWidth: 720, mx: 'auto', mb: 3.5, lineHeight: 1.7 }}
          >
            Everything you need to know about billing, trials, and what’s included—so you can choose with confidence.
          </Typography>

          <Box>
            {items.map((item) => {
              const id = item.id || `faq-${item.question?.slice(0, 20).replace(/\s/g, '-')}`;
              const isExpanded = singleExpanded ? expanded === id : expanded === id;
              const answer = item.answer ?? item.content;
              const videoUrl = item.videoUrl ?? (item.video && (item.video.url || item.video));

              return (
                <Accordion
                  key={id}
                  expanded={isExpanded}
                  onChange={handleChange(id)}
                  disableGutters
                  sx={{
                    '&:before': { display: 'none' },
                    boxShadow: 'none',
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: '14px !important',
                    mb: 1.25,
                    '&:last-of-type': { mb: 0 },
                    bgcolor: theme.palette.mode === 'light' ? '#ffffff' : theme.palette.background.paper,
                    overflow: 'hidden',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
                    '&:hover': {
                      borderColor: theme.palette.mode === 'light'
                        ? 'rgba(65, 139, 202, 0.35)'
                        : 'rgba(65, 139, 202, 0.35)',
                    },
                    '&.Mui-expanded': {
                      borderColor: theme.palette.primary.main,
                      boxShadow: theme.palette.mode === 'light'
                        ? '0 10px 22px rgba(15, 23, 42, 0.08)'
                        : '0 12px 24px rgba(0, 0, 0, 0.35)',
                    },
                  }}
                  TransitionProps={{ timeout: 220 }}
                >
                  <AccordionSummary
                    expandIcon={(
                      <Box
                        sx={{
                          width: 34,
                          height: 34,
                          display: 'grid',
                          placeItems: 'center',
                          borderRadius: '10px',
                          border: `1px solid ${theme.palette.divider}`,
                          bgcolor: isExpanded
                            ? (theme.palette.mode === 'light' ? 'rgba(65, 139, 202, 0.10)' : 'rgba(65, 139, 202, 0.18)')
                            : 'transparent',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <MdExpandMore
                          size={22}
                          color={isExpanded ? theme.palette.primary.main : theme.palette.text.secondary}
                        />
                      </Box>
                    )}
                    aria-expanded={isExpanded}
                    aria-controls={`${id}-content`}
                    id={`${id}-header`}
                    sx={{
                      py: 1.4,
                      px: 2,
                      '& .MuiAccordionSummary-content': { my: 1.2 },
                      '&:focus-visible': {
                        outline: `2px solid ${theme.palette.primary.main}`,
                        outlineOffset: 2,
                        borderRadius: 2,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                        width: '100%',
                      }}
                    >
                      <Box
                        aria-hidden="true"
                        sx={{
                          mt: '2px',
                          width: 10,
                          height: 10,
                          borderRadius: '999px',
                          bgcolor: isExpanded ? theme.palette.secondary.main : theme.palette.primary.main,
                          boxShadow: isExpanded
                            ? '0 0 0 6px rgba(242, 106, 39, 0.10)'
                            : '0 0 0 6px rgba(65, 139, 202, 0.10)',
                          transition: 'all 0.2s ease',
                          flexShrink: 0,
                        }}
                      />
                      <Typography
                        component="span"
                        fontWeight={700}
                        sx={{
                          color: 'text.primary',
                          fontSize: { xs: '1rem', sm: '1.05rem' },
                          pr: 1,
                          lineHeight: 1.35,
                        }}
                      >
                        {item.question}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails
                    id={`${id}-content`}
                    role="region"
                    aria-labelledby={`${id}-header`}
                    sx={{
                      px: 2,
                      pb: 2.25,
                      pt: 0,
                    }}
                  >
                    <AnswerContent
                      answer={answer}
                      videoUrl={videoUrl}
                      isExpanded={isExpanded}
                      theme={theme}
                    />
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default PricingFAQ;

/**
 * Default FAQ items for the YouInSports Premium pricing page.
 * answer can be string, or { text } for future rich content.
 * videoUrl can be set per item for optional YouTube embed (lazy-loaded when opened).
 */
export const PRICING_FAQ_ITEMS = [
  {
    id: 'whats-included-premium',
    question: 'What is included in the Premium plan?',
    answer:
      'Premium includes everything in Basic (Tick For Verified Profile and Access to Sponsorship Program) plus: Generate PGN with Scoresheet/Game Video, Download PGN File, AI Based Game Analysis, and Stockfish Analysis.',
  },
  {
    id: 'monthly-or-yearly',
    question: 'Is the pricing monthly or yearly?',
    answer:
      'Basic is billed annually only, so you see the annual price directly. Premium can be billed monthly or yearly, and the yearly option saves 20% compared to paying month by month.',
  },
  {
    id: 'cancel-anytime',
    question: 'Can I cancel anytime?',
    answer:
      'Yes. You can cancel anytime. If you cancel before your trial ends, you won’t be charged. If you’re already on a paid plan, you keep access until the end of your current billing period.',
  },
  {
    id: 'free-trial-refund',
    question: 'Is there a free trial or refund policy?',
    answer:
      'Yes—start with a 30-day free trial. No payment is due today. You can cancel anytime. If you have questions about refunds after a payment has been processed, contact support and we’ll help you.',
  },
  {
    id: 'upgrade-downgrade',
    question: 'What happens if I upgrade or downgrade?',
    answer:
      'You can switch plans from your account settings. Upgrades take effect immediately (you get access to Premium features right away). Downgrades apply at the end of your current billing period so you don’t lose access early.',
  },
  {
    id: 'hidden-charges',
    question: 'Are there any hidden charges?',
    answer:
      'No. There are no setup fees or hidden charges. Taxes may apply depending on your country—if so, they’ll be clearly shown at checkout before you confirm payment.',
  },
  {
    id: 'support-included',
    question: 'Is support included in all plans?',
    answer:
      'Yes. Support is included in all plans. You can reach us through in-app or email support, and we’ll respond as quickly as possible.',
  },
  {
    id: 'payment-secure',
    question: 'Is my payment secure?',
    answer:
      'Yes. Payments are handled through secure, PCI-compliant providers. We don’t store your full card details, and transactions are protected with industry-standard encryption.',
  },
  // Placeholder for future FAQ with video (not active by default):
  // {
  //   id: 'how-to-get-started',
  //   question: 'How do I get started after subscribing?',
  //   answer: 'Watch this short walkthrough to set up your profile and make the most of Premium.',
  //   videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  // },
];
