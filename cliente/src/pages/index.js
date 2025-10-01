import { lazy } from "react";

const FrontPage = lazy(() => import("./FrontPage"));
const BecomeSeller = lazy(() => import("./BecomeSeller"));
const Cart = lazy(() => import("./Cart"));
const VendorDashboard = lazy(() => import("./VendorDashboard"));
const AddNewProduct = lazy(() => import("./AddNewProduct"));
const UploadImages = lazy(() => import("./UploadImages"));
const EditProduct = lazy(() => import("./EditProduct"));
const Login = lazy(() => import("./Login"));
const Product = lazy(() => import("./Product"));
const SignUp = lazy(() => import("./SignUp"));
const SignInClient = lazy(() => import("./SignClient/SignInClient"));
const RegisterClient = lazy(() => import("./SignClient/RegisterClient"));
const AuthClient = lazy(() => import("./AuthClient"));
const Checkout = lazy(() => import("./checkout/Checkout"));
const Orders = lazy(() => import("./Orders"));
const History = lazy(() => import("./History"));
const Category = lazy(() => import("./Category"));



export default {
    FrontPage,
    BecomeSeller,
    Cart,
    VendorDashboard,
    AddNewProduct,
    UploadImages,
    EditProduct,
    Login,
    Product,
    SignUp,
    SignInClient,
    RegisterClient,
    AuthClient,
    Checkout,
    Orders,
    History,
    Category
}

