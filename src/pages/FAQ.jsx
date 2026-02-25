import React, { useState } from "react"
import { Link } from "react-router-dom"
import SeoSchema from "../components/SeoSchema"
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  TextField,
  Typography,
  Fade,
} from "@mui/material"
import {
  MdHelpOutline,
  MdSearch,
  MdMessage,
  MdPhone,
  MdMail,
  MdAdd,
  MdRemove,
  MdPlayCircleOutline
} from "react-icons/md"

export default function FAQ() {
  const [expanded, setExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqCategories = [
    {
      category: "Getting Started",
      questions: [
        {
          id: "getting-started-1",
          question: "How do I create an account on You In Sports?",
          answer:
            "Creating an account is simple! Click the 'Sign Up' button, choose your account type (Athlete, Coach, or Organizer), fill in your basic information, and verify your email. You'll be ready to start building your sports profile immediately.",
          tags: ["account", "signup", "registration"],
          hasVideo: true,
        },
        {
          id: "getting-started-2",
          question: "What types of accounts are available?",
          answer:
            "You In Sports offers three main account types: Athlete accounts for sports professionals seeking support and opportunities, Coach accounts for mentors and trainers, and Organizer accounts for event planners and sports organizations. Each account type has specialized features tailored to your needs.",
          tags: ["account types", "features"],
        },
        {
          id: "getting-started-3",
          question: "How do I complete my profile?",
          answer:
            "After signing up, navigate to your profile settings. Add your sports background, achievements, photos, and goals. The more complete your profile, the better we can match you with opportunities and supporters. Our profile completion guide walks you through each step.",
          tags: ["profile", "setup", "completion"],
          hasVideo: true,
        },
      ],
    },
    {
      category: "For Athletes",
      questions: [
        {
          id: "athletes-1",
          question: "How can I get financial support for my sports career?",
          answer:
            "UinSports connects athletes with supporters through our funding platform. Create compelling content about your journey, set clear funding goals, and engage with your community. Supporters can contribute to specific needs like equipment, training, or competition travel.",
          tags: ["funding", "support", "financial"],
        },
        {
          id: "athletes-2",
          question: "How do I track my performance and progress?",
          answer:
            "Our performance tracker allows you to log training sessions, competition results, and personal bests. You can visualize your progress over time, share achievements with supporters, and use data to improve your training strategy.",
          tags: ["performance", "tracking", "analytics"],
          hasVideo: true,
        },
        {
          id: "athletes-3",
          question: "Can I connect with coaches and mentors?",
          answer:
            "Yes! Browse our coach directory, read reviews, and connect with certified professionals in your sport. Many coaches offer both in-person and virtual training sessions. You can also join group training programs and workshops.",
          tags: ["coaches", "mentors", "training"],
        },
      ],
    },
    {
      category: "For Coaches",
      questions: [
        {
          id: "coaches-1",
          question: "How can I offer my coaching services?",
          answer:
            "Create a detailed coach profile showcasing your experience, certifications, and coaching philosophy. Set your availability, pricing, and preferred training methods. Athletes can then book sessions directly through the platform.",
          tags: ["coaching", "services", "booking"],
          hasVideo: true,
        },
        {
          id: "coaches-2",
          question: "What tools are available for managing athletes?",
          answer:
            "Our coach dashboard includes athlete progress tracking, session scheduling, performance analytics, and communication tools. You can create custom training plans, monitor athlete development, and provide feedback efficiently.",
          tags: ["management", "tools", "dashboard"],
        },
      ],
    },
    {
      category: "For Organizers",
      questions: [
        {
          id: "organizers-1",
          question: "How do I create and promote sports events?",
          answer:
            "Use our event creation tool to set up competitions, tournaments, or training camps. Add event details, registration requirements, and promotional materials. Our platform helps you reach the right audience and manage registrations seamlessly.",
          tags: ["events", "promotion", "organization"],
          hasVideo: true,
        },
        {
          id: "organizers-2",
          question: "How can I find sponsors for my events?",
          answer:
            "Our sponsor matching system connects event organizers with potential sponsors based on event type, audience, and sponsor preferences. Create compelling sponsorship packages and track sponsor engagement through our analytics dashboard.",
          tags: ["sponsors", "funding", "partnerships"],
        },
      ],
    },
    {
      category: "Technical Support",
      questions: [
        {
          id: "technical-1",
          question: "I'm having trouble uploading photos or videos",
          answer:
            "Ensure your files are in supported formats (JPG, PNG for photos; MP4, MOV for videos) and under our size limits (10MB for photos, 100MB for videos). Clear your browser cache and try again. If issues persist, contact our technical support team.",
          tags: ["upload", "technical", "media"],
          hasVideo: true,
        },
        {
          id: "technical-2",
          question: "How do I reset my password?",
          answer:
            "Click 'Forgot Password' on the login page, enter your email address, and check your inbox for reset instructions. If you don't receive the email within 10 minutes, check your spam folder or contact support.",
          tags: ["password", "reset", "login"],
        },
        {
          id: "technical-3",
          question: "Is my personal information secure?",
          answer:
            "We use industry-standard encryption and security measures to protect your data. Your personal information is never shared without your consent, and you have full control over your privacy settings.",
          tags: ["security", "privacy", "data"],
        },
      ],
    },
  ];

  const filteredCategories = faqCategories.map(cat => ({
    ...cat,
    questions: cat.questions.filter(
      q => q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  const renderYouTube = (videoId, isExpanded) => {
    if (!isExpanded) return null;
    const src = `https://www.youtube.com/embed/${videoId}?autoplay=0`;
    return (
      <Fade in={isExpanded} timeout={800}>
        <Box sx={{
          mt: 3,
          mb: 1,
          position: "relative",
          paddingTop: "56.25%",
          borderRadius: 1,
          overflow: "hidden",
          boxShadow: "0 10px 30px -10px rgba(65,139,202,0.2)",
          border: "1px solid rgba(65,139,202,0.15)",
          backgroundColor: "#f9fafb"
        }}>
          <Box
            component="iframe"
            src={src}
            title="FAQ video"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            sx={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
          />
        </Box>
      </Fade>
    )
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", bgcolor: "#FAFAFA" }}>
      <SeoSchema
        type="WebPage"
        name="Frequently Asked Questions - You In Sports"
        description="Find answers to common questions about You In Sports platform, features, and services"
        url="https://uinsports.com/faq"
      />

      {/* Hero Section */}
      <Box sx={{
        width: "100%",
        py: { xs: 8, md: 10 },
        position: "relative",
        background: "linear-gradient(135deg, rgba(65,139,202,0.03) 0%, rgba(242,106,39,0.03) 100%)",
        borderBottom: "1px solid rgba(65,139,202,0.08)"
      }}>
        {/* Decorative background elements */}
        <Box sx={{ position: "absolute", top: "10%", left: "5%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(65,139,202,0.05) 0%, transparent 70%)", borderRadius: "50%", zIndex: 0 }} />
        <Box sx={{ position: "absolute", bottom: "10%", right: "5%", width: "250px", height: "250px", background: "radial-gradient(circle, rgba(242,106,39,0.05) 0%, transparent 70%)", borderRadius: "50%", zIndex: 0 }} />

        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 3 }}>
            <Box sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: "20px",
              backgroundColor: "white",
              boxShadow: "0 10px 25px -5px rgba(65,139,202,0.15)",
              transform: "rotate(-5deg)",
              mb: 1
            }}>
              <MdHelpOutline style={{ fontSize: 36, color: "#418BCA" }} />
            </Box>
            <Typography variant="h1" sx={{ fontWeight: 800, fontSize: { xs: 32, sm: 40, md: 48 }, letterSpacing: "-0.02em", color: "#111827" }}>
              How can we <Box component="span" sx={{ color: "#418BCA", position: "relative" }}>
                help you?
                <Box component="span" sx={{ position: "absolute", bottom: -4, left: 0, width: "100%", height: "4px", backgroundColor: "#F26A27", borderRadius: "2px", opacity: 0.8 }} />
              </Box>
            </Typography>
            <Typography sx={{ maxWidth: 650, color: "#4b5563", fontSize: { xs: 16, md: 18 }, lineHeight: 1.6 }}>
              Find quick answers to common questions about You In Sports. Can't find what you're looking for?
              <Box component="span" sx={{ ml: 1 }}>
                <Link to="/contact" style={{ color: "#418BCA", textDecoration: "none", fontWeight: 600 }}>Contact our support team &rarr;</Link>
              </Box>
            </Typography>

            {/* Search Bar */}
            <Box sx={{ width: "100%", maxWidth: 600, mt: 4, position: "relative" }}>
              <Box sx={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", pointerEvents: "none", zIndex: 2 }}>
                <MdSearch style={{ color: "#9ca3af", fontSize: 24 }} />
              </Box>
              <TextField
                fullWidth
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    pl: 6,
                    pr: 2,
                    py: 1,
                    backgroundColor: "white",
                    borderRadius: "100px",
                    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.08)",
                    border: "1px solid rgba(65,139,202,0.1)",
                    transition: "all 0.3s ease",
                    '& fieldset': { border: 'none' },
                    '&:hover': {
                      boxShadow: "0 15px 35px -10px rgba(65,139,202,0.15)",
                    },
                    '&.Mui-focused': {
                      boxShadow: "0 0 0 3px rgba(65,139,202,0.2)",
                    }
                  }
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* FAQ Content Section */}
      <Box sx={{ width: "100%", py: { xs: 6, md: 10 }, zIndex: 1 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* Sidebar Navigation (Desktop) */}
            <Grid item xs={12} md={3} sx={{ display: { xs: "none", md: "block" } }}>
              <Box sx={{ position: "sticky", top: 100 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", mb: 3 }}>
                  Categories
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {filteredCategories.map((category) => (
                    <Box
                      key={category.category}
                      component="a"
                      href={`#${category.category.toLowerCase().replace(/\s+/g, '-')}`}
                      sx={{
                        py: 1.5,
                        px: 2,
                        borderRadius: 2,
                        color: "#4b5563",
                        textDecoration: "none",
                        fontWeight: 600,
                        transition: "all 0.2s ease",
                        '&:hover': {
                          backgroundColor: "rgba(65,139,202,0.08)",
                          color: "#418BCA",
                          transform: "translateX(4px)"
                        }
                      }}
                    >
                      {category.category}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>

            {/* Main FAQ Accordions */}
            <Grid item xs={12} md={9}>
              {filteredCategories.length === 0 ? (
                <Box sx={{ textAlign: "center", py: 10 }}>
                  <Typography variant="h6" sx={{ color: "#6b7280" }}>No matching questions found.</Typography>
                  <Button variant="text" onClick={() => setSearchQuery("")} sx={{ mt: 2, color: "#418BCA", fontWeight: 600 }}>
                    Clear Search
                  </Button>
                </Box>
              ) : (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {filteredCategories.map((category) => (
                    <Box key={category.category} id={category.category.toLowerCase().replace(/\s+/g, '-')}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                        <Typography variant="h4" sx={{ fontWeight: 800, color: "#111827", letterSpacing: "-0.01em" }}>
                          {category.category}
                        </Typography>
                        <Chip
                          label={`${category.questions.length}`}
                          size="small"
                          sx={{
                            backgroundColor: "rgba(65,139,202,0.1)",
                            color: "#418BCA",
                            fontWeight: 700,
                            borderRadius: "8px"
                          }}
                        />
                      </Box>

                      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {category.questions.map((faq) => (
                          <Card
                            key={faq.id}
                            sx={{
                              borderRadius: 3,
                              border: expanded === faq.id ? "1px solid rgba(65,139,202,0.4)" : "1px solid rgba(0,0,0,0.05)",
                              boxShadow: expanded === faq.id ? "0 10px 30px -10px rgba(65,139,202,0.15)" : "0 4px 6px -1px rgba(0,0,0,0.02)",
                              transition: "all 0.3s ease",
                              backgroundColor: expanded === faq.id ? "#ffffff" : "rgba(255,255,255,0.7)",
                              backdropFilter: "blur(10px)",
                              overflow: "hidden"
                            }}
                          >
                            <Accordion
                              expanded={expanded === faq.id}
                              onChange={handleChange(faq.id)}
                              disableGutters
                              elevation={0}
                              sx={{
                                backgroundColor: "transparent",
                                '&:before': { display: 'none' },
                              }}
                            >
                              <AccordionSummary
                                expandIcon={
                                  <Box sx={{
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    width: 32, height: 32, borderRadius: "50%",
                                    backgroundColor: expanded === faq.id ? "#418BCA" : "rgba(65,139,202,0.1)",
                                    color: expanded === faq.id ? "white" : "#418BCA",
                                    transition: "all 0.3s ease",
                                  }}>
                                    {expanded === faq.id ? <MdRemove size={20} /> : <MdAdd size={20} />}
                                  </Box>
                                }
                                sx={{
                                  px: { xs: 2.5, md: 4 },
                                  py: { xs: 1.5, md: 2 },
                                  '& .MuiAccordionSummary-content': {
                                    my: 0,
                                    pr: 2
                                  }
                                }}
                              >
                                <Typography sx={{
                                  fontWeight: expanded === faq.id ? 700 : 600,
                                  fontSize: { xs: 16, md: 18 },
                                  color: expanded === faq.id ? "#111827" : "#374151"
                                }}>
                                  {faq.question}
                                </Typography>
                                {faq.hasVideo && (
                                  <Box sx={{ ml: 2, display: { xs: 'none', sm: 'flex' }, alignItems: "center", gap: 0.5, color: "#F26A27", opacity: expanded === faq.id ? 0 : 1, transition: "opacity 0.2s" }}>
                                    <MdPlayCircleOutline size={18} />
                                    <Typography sx={{ fontSize: 12, fontWeight: 600 }}>Video</Typography>
                                  </Box>
                                )}
                              </AccordionSummary>
                              <AccordionDetails sx={{ px: { xs: 2.5, md: 4 }, pb: { xs: 3, md: 4 }, pt: 0 }}>
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                  <Typography sx={{ color: "#4b5563", lineHeight: 1.8, fontSize: 16 }}>
                                    {faq.answer}
                                  </Typography>

                                  {/* Embed YouTube Video if the question has hasVideo flag */}
                                  {faq.hasVideo && renderYouTube("juSV7oV2U_U", expanded === faq.id)}

                                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 3 }}>
                                    {faq.tags.map((tag) => (
                                      <Chip
                                        key={tag}
                                        label={tag}
                                        size="small"
                                        sx={{
                                          backgroundColor: "rgba(0,0,0,0.03)",
                                          color: "#6b7280",
                                          fontWeight: 500,
                                          fontSize: 12,
                                          borderRadius: "6px"
                                        }}
                                      />
                                    ))}
                                  </Box>
                                </Box>
                              </AccordionDetails>
                            </Accordion>
                          </Card>
                        ))}
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Modern Contact CTA */}
      <Box sx={{ width: "100%", py: { xs: 8, md: 12 }, position: "relative", overflow: "hidden", mt: "auto" }}>
        {/* Abstract background */}
        <Box sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "#111827", zIndex: 0 }} />
        <Box sx={{ position: "absolute", top: "-50%", left: "-10%", width: "60%", height: "200%", background: "radial-gradient(circle, rgba(65,139,202,0.15) 0%, transparent 70%)", zIndex: 0 }} />
        <Box sx={{ position: "absolute", bottom: "-50%", right: "-10%", width: "60%", height: "200%", background: "radial-gradient(circle, rgba(242,106,39,0.15) 0%, transparent 70%)", zIndex: 0 }} />

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ textAlign: "center", mb: 6, maxWidth: 600, mx: "auto" }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: "white", letterSpacing: "-0.02em" }}>
              Still have questions?
            </Typography>
            <Typography sx={{ color: "#9ca3af", fontSize: 18, lineHeight: 1.6 }}>
              Our dedicated support team is always ready to help you succeed on your sports journey.
            </Typography>
          </Box>

          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Card sx={{
                height: "100%",
                backgroundColor: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 4,
                color: "white",
                transition: "all 0.3s ease",
                '&:hover': {
                  transform: "translateY(-8px)",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderColor: "rgba(65,139,202,0.3)",
                }
              }}>
                <CardContent sx={{ p: 4, textAlign: "center", display: "flex", flexDirection: "column", height: "100%" }}>
                  <Box sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 64, height: 64, borderRadius: "20px", backgroundColor: "rgba(65,139,202,0.2)", mb: 3, mx: "auto" }}>
                    <MdMessage style={{ color: "#418BCA", fontSize: 28 }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Live Chat</Typography>
                  <Typography sx={{ fontSize: 15, color: "#9ca3af", mb: 4, flexGrow: 1 }}>Get instant support from our friendly team members</Typography>
                  <Button
                    fullWidth
                    sx={{
                      color: 'white',
                      fontWeight: 700,
                      py: 1.5,
                      borderRadius: '12px',
                      backgroundColor: '#F26A27',
                      textTransform: 'none',
                      fontSize: 16,
                      boxShadow: '0 4px 14px 0 rgba(242, 106, 39, 0.39)',
                      '&:hover': {
                        backgroundColor: '#d95a1e',
                        boxShadow: '0 6px 20px rgba(242, 106, 39, 0.4)',
                      },
                    }}
                  >Start a Chat</Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{
                height: "100%",
                backgroundColor: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 4,
                color: "white",
                transition: "all 0.3s ease",
                '&:hover': {
                  transform: "translateY(-8px)",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  borderColor: "rgba(242,106,39,0.3)",
                }
              }}>
                <CardContent sx={{ p: 4, textAlign: "center", display: "flex", flexDirection: "column", height: "100%" }}>
                  <Box sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 64, height: 64, borderRadius: "20px", backgroundColor: "rgba(242,106,39,0.2)", mb: 3, mx: "auto" }}>
                    <MdMail style={{ color: "#F26A27", fontSize: 28 }} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Email Us</Typography>
                  <Typography sx={{ fontSize: 15, color: "#9ca3af", mb: 4, flexGrow: 1 }}>Send us a detailed message and we'll reply within 24h</Typography>
                  <Link to="/contact" style={{ textDecoration: "none", width: "100%" }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      sx={{
                        color: 'white',
                        fontWeight: 700,
                        py: 1.5,
                        borderRadius: '12px',
                        borderColor: 'rgba(255,255,255,0.2)',
                        textTransform: 'none',
                        fontSize: 16,
                        '&:hover': {
                          borderColor: 'white',
                          backgroundColor: 'rgba(255,255,255,0.05)',
                        },
                      }}
                    >Send Email</Button>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}
