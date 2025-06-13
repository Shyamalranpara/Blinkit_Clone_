import { useState, useEffect } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import EditCategory from '../components/EditCategory'
import ConfirmBox from '../components/ConfirmBox'
import AxiosToastError from '../utils/AxiosToastError'
import { useSelector } from 'react-redux'

const CategoryPage = () => {
  const [openUploadCategory, setOpenUploadCategory] = useState(false)
  const [loading, setLoading] = useState(false)
  const [categoryData, setCategoryData] = useState([])
  const [openEdit, setOpenEdit] = useState(false)
  const [editData, setEditData] = useState({
    name: '',
    image: ''
  })

  const [openConfimBoxDelete, setOpenConfirmBoxDelete] = useState(false)

  const [deleteCategory, setDeleteCategory] = useState({
    _id: ""
  })

  // const allCategory = useSelector((state) => state.product.allCategory)
  // // console.log("allCategory", allCategory)

  // useEffect(()=>{
  //   setCategoryData(allCategory)
  // },[allCategory])
  
  const fetchCategory = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getCategory
      })
      const { data: responseData } = response
      // console.log(response)


      if (responseData.success) {
        setCategoryData(responseData.data)
      }
    } catch (error) {

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategory()
  }, [])
  // console.log("catdata", categoryData)


  const handleDeleteCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.deleteCategory,
        data: deleteCategory
      })
      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        fetchCategory()
        setOpenConfirmBoxDelete(false)
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section>
      <div className='p-2   bg-white shadow-md flex items-center justify-between'>
        <h2 className='font-semibold'>Category</h2>
        <button onClick={() => setOpenUploadCategory(true)} className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded'>Add Category</button>
      </div>

      {
        !categoryData[0] && !loading && (
          <NoData />
        )
      }

      <div className='p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-2'>
        {
          categoryData.map((el, i) => {
            return (
              <div className='w-32 h-56 rounded shadow-md ' key={el._id}>
                <img
                  src={el.image}
                  alt={el.name}
                  className='w-full object-scale-down' />

                {/* inner img  */}
                <div className='items-center h-9 flex gap-2'>
                  <button
                    onClick={() => {
                      setOpenEdit(true)
                      setEditData(el)
                    }}
                    className='flex-1 bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 rounded'>
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      setOpenConfirmBoxDelete(true)
                      setDeleteCategory(el)
                    }}
                    className='flex-1 bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 rounded'>
                    Delete
                  </button>
                </div>
              </div>
            )
          })
        }
      </div>

      {
        loading && (
          <Loading />
        )
      }

      {
        openUploadCategory && (

          <UploadCategoryModel fetchData={fetchCategory} close={() => setOpenUploadCategory(false)} />
        )
      }

      {
        openEdit && (
          <EditCategory data={editData} close={() => setOpenEdit(false)} fetchData={fetchCategory} />
        )
      }

      {
        openConfimBoxDelete && (
          <ConfirmBox close={() => setOpenConfirmBoxDelete(false)} cancel={() => setOpenConfirmBoxDelete(false)} confirm={handleDeleteCategory} />
        )
      }
    </section>
  )
}

export default CategoryPage
