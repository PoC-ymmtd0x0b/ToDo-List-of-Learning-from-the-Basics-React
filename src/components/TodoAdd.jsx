import { Textarea, Button } from "@chakra-ui/react";

const TodoAdd = ({
  inputEl,
  handleAddTodoListItem,
  placeholder,
  leftIcon,
  buttonText,
}) => {
  return (
    <>
      <Textarea
        placeholder={placeholder}
        bgColor="white"
        mt="8"
        borderColor="gray.400"
        ref={inputEl}
      />
      <Button
        onClick={handleAddTodoListItem}
        colorScheme="blue"
        leftIcon={leftIcon}
        mt="9"
      >
        {buttonText}
      </Button>
    </>
  );
};

export { TodoAdd };
