
import React from 'react';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Box,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function AboutPage() {
    const theme = useTheme();

    return (
        <Container sx={{ py: 8 }}>
            {/* Заголовок страницы */}
            <Typography
                variant="h2"
                component="h1"
                align="center"
                gutterBottom
                sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}
            >
                О нашей компании
            </Typography>

            {/* Основной текст */}
            <Typography variant="body1" align="center" paragraph>
                Мы — современная компания, которая специализируется на создании
                инновационных решений для наших клиентов. Наша миссия — делать мир лучше
                с помощью технологий.
            </Typography>

            {/* Секция с карточками */}
            <Grid container spacing={4} sx={{ mt: 4 }}>
                {/* Карточка 1: Наша миссия */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Наша миссия
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Мы стремимся создавать продукты, которые улучшают жизнь людей и
                                делают мир более удобным и безопасным.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Карточка 2: Наши ценности */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Наши ценности
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Мы ценим честность, инновации и качество. Каждый наш проект —
                                это результат упорной работы и внимания к деталям.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Карточка 3: Наша команда */}
                <Grid item xs={12} md={4}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h5" component="h2" gutterBottom>
                                Наша команда
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Наша команда состоит из профессионалов, которые любят своё дело
                                и всегда готовы предложить лучшее решение для вашего бизнеса.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Секция с изображением */}
            <Box sx={{ mt: 8, textAlign: 'center' }}>
                <img
                    src="https://via.placeholder.com/800x400" // Замените на реальное изображение
                    alt="О нашей компании"
                    style={{ width: '100%', maxWidth: '800px', borderRadius: '8px' }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    Наш офис — это место, где рождаются идеи и воплощаются мечты.
                </Typography>
            </Box>

            {/* Дополнительный текст */}
            <Typography variant="body1" align="center" sx={{ mt: 8 }}>
                Мы гордимся тем, что делаем, и всегда открыты для новых вызовов. Если у
                вас есть вопросы или идеи, свяжитесь с нами!
            </Typography>
        </Container>
    );
}