import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
const LanguageCard = (props) => {
  const navigate = useNavigate();
  const [language, setLanguage] = React.useState();
  const handlePress = () => {
    navigate("/class");
  };
  return (
    <div>
      <Card
        className="py-4 bg-white  p-3 rounded-xl"
        isPressable
        onPress={handlePress}
      >
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
          <small className="text-default-500">Language</small>
          <h4 className="font-bold text-large text-black">{props.name}</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-2xl h-24"
            src={props.url}
            width={180}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default LanguageCard;
