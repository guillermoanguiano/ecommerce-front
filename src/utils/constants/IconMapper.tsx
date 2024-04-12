import { FoodBank, LocalDrink, Smartphone, Tablet } from "@mui/icons-material";

const IconMapper = ({ iconName }: { iconName: string }) => {
    switch (iconName) {
        case "Smartphone":
            return <Smartphone />;
        case "Tablet":
            return <Tablet />;
        case "FoodBank":
            return <FoodBank />;
        case "LocalDrink":
            return <LocalDrink />;
        default:
            return null;
    }
};

export default IconMapper;