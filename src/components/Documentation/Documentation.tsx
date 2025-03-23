import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import LinkIcon from "@mui/icons-material/Link";
import ArticleIcon from "@mui/icons-material/Article";
import SchoolIcon from "@mui/icons-material/School";

export const Documentation = () => {
    return (
        <>
            <Typography sx={{ textAlign: "center" }} variant={"h5"}>
                Список доступных документов:
            </Typography>
            <List>
                <ListItem>
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                        }}
                    >
                        <LinkIcon />
                    </ListItemIcon>
                    <ListItemText>
                        <Link
                            href="https://www.bsuir.by/ru/smk"
                            variant="body2"
                            mr={2}
                            target="_blank"
                        >
                            Качество образовния
                        </Link>
                    </ListItemText>
                </ListItem>

                <ListItem>
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                        }}
                    >
                        <LinkIcon />
                    </ListItemIcon>
                    <ListItemText>
                        <Link
                            href="https://www.bsuir.by/ru/stranitsa-yurista"
                            variant="body2"
                            mr={2}
                            target="_blank"
                        >
                            Страница юриста
                        </Link>
                    </ListItemText>
                </ListItem>

                <ListItem>
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                        }}
                    >
                        <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText>
                        <Link
                            href="https://iis.bsuir.by/public_iis_files/studentMail.pdf"
                            variant="body2"
                            mr={2}
                            target="_blank"
                        >
                            Студенческая почта
                        </Link>
                    </ListItemText>
                </ListItem>

                <ListItem>
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                        }}
                    >
                        <LinkIcon />
                    </ListItemIcon>
                    <ListItemText>
                        <Link
                            href="https://www.bsuir.by/ru/energosberezhenie"
                            variant="body2"
                            mr={2}
                            target="_blank"
                        >
                            Энергосбережение
                        </Link>
                    </ListItemText>
                </ListItem>

                <ListItem>
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                        }}
                    >
                        <ArticleIcon />
                    </ListItemIcon>
                    <ListItemText>
                        <Link
                            href="https://www.bsuir.by/m/12_100229_1_166894.pdf"
                            variant="body2"
                            mr={2}
                            target="_blank"
                        >
                            Политика БГУИР в области интеллектуальной собственности
                        </Link>
                    </ListItemText>
                </ListItem>

                <ListItem>
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                        }}
                    >
                        <ArticleIcon />
                    </ListItemIcon>
                    <ListItemText>
                        <Link
                            href="https://www.bsuir.by/m/12_100229_1_157457.pdf"
                            variant="body2"
                            mr={2}
                            target="_blank"
                        >
                            Политика безопасности в отношении обработки персональных данных
                            БГУИР
                        </Link>
                    </ListItemText>
                </ListItem>

                <ListItem>
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                        }}
                    >
                        <ArticleIcon />
                    </ListItemIcon>
                    <ListItemText>
                        <Link
                            href="https://www.bsuir.by/ru/sayty-partnyory"
                            variant="body2"
                            mr={2}
                            target="_blank"
                        >
                            Сайты партнёры
                        </Link>
                    </ListItemText>
                </ListItem>

                <ListItem>
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                        }}
                    >
                        <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText>
                        <Link
                            href="https://iis.bsuir.by/public_iis_files/softwareList.pdf"
                            variant="body2"
                            mr={2}
                            target="_blank"
                        >
                            Стандартный набор ПО
                        </Link>
                    </ListItemText>
                </ListItem>

                <ListItem>
                    <ListItemIcon
                        sx={{
                            minWidth: "32px",
                        }}
                    >
                        <LinkIcon />
                    </ListItemIcon>
                    <ListItemText>
                        <Link
                            href="https://www.bsuir.by/ru/umu-informatsionnaya-baza"
                            variant="body2"
                            target="_blank"
                            mr={2}
                        >
                            Нормативно-правовое обеспечение учебного процесса
                        </Link>
                    </ListItemText>
                </ListItem>
            </List>
        </>
    );
};
