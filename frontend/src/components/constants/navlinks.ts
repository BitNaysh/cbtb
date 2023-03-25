import {
    DashboardCustomize,
    DashboardCustomizeOutlined,
    Article,
    ArticleOutlined,
    Description,
    DescriptionOutlined,
    InsertChart,
    InsertChartOutlined,
    Settings,
    SettingsOutlined,
    Person,
    PersonOutline,
} from "@mui/icons-material";

const navLinks = [
    {
        id: 0,
        name: "Dashboard",
        route: "dashboard",
        iconSolid: DashboardCustomize,
        iconOutlined: DashboardCustomizeOutlined,
    },
    {
        id: 1,
        name: "Add Image",
        route: "train-model",
        iconSolid: Article,
        iconOutlined: ArticleOutlined,
    },
    // {
    //     id: 2,
    //     name: "Test Model",
    //     route: "test-model",
    //     iconSolid: Description,
    //     iconOutlined: DescriptionOutlined,
    // },
    // {
    //     id: 3,
    //     name: "Insights",
    //     route: "insights",
    //     iconSolid: InsertChart,
    //     iconOutlined: InsertChartOutlined,
    // },
    {
        id: 2,
        name: "Details",
        route: "details",
        iconSolid: Person,
        iconOutlined: PersonOutline,
    },
    // {
    //     id: 3,
    //     name: "Settings",
    //     route: "settings",
    //     iconSolid: Settings,
    //     iconOutlined: SettingsOutlined,
    // },
];

export default navLinks;
