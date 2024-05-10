import CategoryForm from "../components/categoryForm/categoryForm"
import Header from "../components/header/header"

function AddCategory({user}) {

  return (
    <>
        <Header user={user}/>
        <CategoryForm/>
    </>
  )
}

export default AddCategory
