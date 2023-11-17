import BookItem from "./bookItem";

function Books(props){
    //changed to _id to match with mongoDB

    return props.myBooks.map(
        (book)=>{
            return <BookItem myBook={book} key={book._id}></BookItem>
        }
    );

}

export default Books;