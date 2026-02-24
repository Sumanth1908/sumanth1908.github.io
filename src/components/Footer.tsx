import { Box, Typography, Container, IconButton, Stack } from '@mui/material';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 6,
                px: 2,
                mt: 'auto',
                backgroundColor: 'background.paper',
                borderTop: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Container maxWidth="md">
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
                    <Typography variant="body2" color="text.secondary">
                        © {new Date().getFullYear()} Sumanth. All rights reserved.
                    </Typography>

                    <Stack direction="row" spacing={1}>
                        <IconButton color="inherit" aria-label="GitHub" href="#">
                            <Github size={20} />
                        </IconButton>
                        <IconButton color="inherit" aria-label="LinkedIn" href="#">
                            <Linkedin size={20} />
                        </IconButton>
                        <IconButton color="inherit" aria-label="Twitter" href="#">
                            <Twitter size={20} />
                        </IconButton>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;
