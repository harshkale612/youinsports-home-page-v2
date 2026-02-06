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
    setExpanded(singleExpanded ? (isExpandedPanel ? panelId : false) : undefined);
  };

  return (
    <Box
      component="section"
      aria-label={title}
      sx={{
        mt: { xs: 10, md: 12 },
        maxWidth: 800,
        mx: 'auto',
      }}
    >
      <Typography
        variant="h3"
        fontWeight={800}
        textAlign="center"
        gutterBottom
        sx={{
          color: 'text.primary',
          fontSize: { xs: '1.75rem', md: '2rem' },
          mb: 4,
        }}
      >
        {title}
      </Typography>

      <Box>
        {items.map((item) => {
          const id = item.id || `faq-${item.question?.slice(0, 20).replace(/\s/g, '-')}`;
          const isExpanded = singleExpanded ? expanded === id : undefined;
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
                borderRadius: '12px !important',
                mb: 1.5,
                '&:last-of-type': { mb: 0 },
                bgcolor: theme.palette.background.paper,
                transition: 'background-color 0.2s ease, border-color 0.2s ease',
                '&.Mui-expanded': {
                  borderColor: theme.palette.primary.main,
                  boxShadow: theme.palette.mode === 'light'
                    ? '0 4px 12px rgba(65, 139, 202, 0.08)'
                    : '0 4px 12px rgba(0, 0, 0, 0.2)',
                },
              }}
              TransitionProps={{ timeout: 200 }}
            >
              <AccordionSummary
                expandIcon={<MdExpandMore size={24} color={theme.palette.text.secondary} />}
                aria-expanded={isExpanded}
                aria-controls={`${id}-content`}
                id={`${id}-header`}
                sx={{
                  py: 1.5,
                  px: 2,
                  '& .MuiAccordionSummary-content': { my: 1.5 },
                }}
              >
                <Typography
                  component="span"
                  fontWeight={600}
                  sx={{
                    color: 'text.primary',
                    fontSize: '1rem',
                    pr: 1,
                  }}
                >
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails
                id={`${id}-content`}
                role="region"
                aria-labelledby={`${id}-header`}
                sx={{ px: 2, pb: 2, pt: 0 }}
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
      'Premium includes everything in Basic (Blue Tick Verified Profile and Access to Sponsorship Program) plus: Generate PGN with Scoresheet/Game Video, Download PGN File, Game Analysis, and Stockfish Analysis. Basic is annual-only; Premium is available monthly or yearly with a discount on the yearly option.',
  },
  {
    id: 'monthly-or-yearly',
    question: 'Is the pricing monthly or yearly?',
    answer:
      'Basic is billed annually only. Premium can be billed monthly or yearly. Yearly billing for Premium saves 20% compared to paying monthly. Prices are shown in your local currency (USD, CAD, or INR) based on your location.',
  },
  {
    id: 'cancel-anytime',
    question: 'Can I cancel anytime?',
    answer:
      'Yes. You can cancel your subscription at any time from your account settings. After cancellation, you keep access until the end of your current billing period. No further charges will be made.',
  },
  {
    id: 'free-trial-refund',
    question: 'Is there a free trial or refund policy?',
    answer:
      'New subscribers can start a 30-day free trial; no payment is due at sign-up. If you cancel before the trial ends, you are not charged. Refund requests for paid periods are handled case by case—contact support for assistance.',
  },
  {
    id: 'upgrade-downgrade',
    question: 'What happens if I upgrade or downgrade?',
    answer:
      'Upgrades take effect immediately; you get access to the new plan features and we prorate the charge. Downgrades apply at the end of your current billing period so you keep your current plan until then.',
  },
  {
    id: 'hidden-charges',
    question: 'Are there any hidden charges?',
    answer:
      'No. The price shown is what you pay. There are no setup fees or hidden costs. Taxes may apply depending on your country; these will be shown at checkout if applicable.',
  },
  {
    id: 'support-included',
    question: 'Is support included in all plans?',
    answer:
      'Yes. Email and in-app support are included for both Basic and Premium. We aim to respond to all requests within 24–48 hours on business days.',
  },
  {
    id: 'payment-secure',
    question: 'Is my payment secure?',
    answer:
      'Yes. Payments are processed by secure, PCI-compliant providers. We do not store your full card details. All transactions use encryption and industry-standard security practices.',
  },
  // Placeholder for future FAQ with video (not active by default):
  // {
  //   id: 'how-to-get-started',
  //   question: 'How do I get started after subscribing?',
  //   answer: 'Watch this short walkthrough to set up your profile and make the most of Premium.',
  //   videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  // },
];
