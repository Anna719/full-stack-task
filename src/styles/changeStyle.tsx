export const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  background: isDragging ? '#1B3F5F' : 'white',
  color: isDragging ? 'white' : 'black',
  borderRadius: `8px`,
  ...draggableStyle,
})
