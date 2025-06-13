import { Outlet } from 'react-router';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import fetchUserDetails from './utils/fetchUserDetails';
import { setUserDetails } from './store/userSlice';
import { useDispatch } from 'react-redux';
import { setAllCategory,setAllSubCategory } from './store/productSlice';
import Axios from './utils/Axios';
import SummaryApi from './common/SummaryApi';

const App = () => {
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const userData = await fetchUserDetails();
    dispatch(setUserDetails(userData.data));
  };

  const fetchCategory = async () => {
    try {
      // dispatch(setLoadingCategory(true));
      const response = await Axios({
        ...SummaryApi.getCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        dispatch(setAllCategory(responseData.data));
      }
    } catch (error) {
      console.error("Fetch category error:", error);
    }finally{
      // dispatch(setLoadingCategory(false));
    }
  };

  const fatchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getSubCategory,
      });
      const { data: responseData } = response;

      if (responseData.success) {
        // console.log("All sub category", responseData.data);
        dispatch(setAllSubCategory(responseData.data));
      }
    } catch (error) {
      console.error("Fetch sub-category error:", error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchCategory();
    fatchSubCategory();
  }, []);

  return (
    <>
      <Header />

      <main className="min-h-[78vh]">
        <Outlet />
      </main>

      <Footer />
      <Toaster />
    </>
  );
};

export default App;
