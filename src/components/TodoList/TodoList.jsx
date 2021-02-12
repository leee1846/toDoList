import React, { useState, useEffect } from "react";
import TodoItem from "./../TodoItem/TodoItem";
import * as Styled from "./TodoList.style";
import { useDispatch } from "react-redux";
import {
  DragDropContext,
  Droppable,
  Draggable,
  resetServerContext,
} from "react-beautiful-dnd";
import { listMove } from "../../stores/reducers/TodosReducer";

const TodoList = ({ todoReducer }) => {
  const [currentIndex, setCurrentIndex] = useState(-1);

  const dispatch = useDispatch();
  resetServerContext();

  //리스트 내용 변경시 morebox off
  useEffect(() => {
    setCurrentIndex(-1);
  }, [todoReducer]);

  const onDragEndHandeler = (result) => {
    const currentList = todoReducer;

    const startTagIndex = result.source.index;
    const destinationTagIndex = result.destination.index;

    const [startTag] = Array.from(currentList).splice(result.source.index, 1);

    dispatch(listMove({ startTagIndex, startTag, destinationTagIndex }));
  };

  return (
    <DragDropContext onDragEnd={onDragEndHandeler}>
      <Droppable droppableId='droppableLists'>
        {(provided) => {
          return (
            <Styled.ListContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {todoReducer.map((list, index) => (
                <Draggable
                  key={list.id}
                  draggableId={`${list.id}`}
                  index={index}
                >
                  {(provided) => (
                    <TodoItem
                      provided={provided}
                      todoItem={list}
                      currentNumber={index + 1}
                      isShow={index === currentIndex ? true : false}
                      index={index}
                      setCurrentIndex={setCurrentIndex}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Styled.ListContainer>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
