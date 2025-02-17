import { Route, Routes } from "react-router-dom";
import { LoginPage } from "@/pages/LoginPage";
import { UserSignUpPage } from "@/pages/UserSignupPages";
import { HomePage } from "@/pages/HomePage";
import { AuthenticationRoutes } from "../AuthenticatedRoutes";
import { CategoryListPage } from "@/pages/CategoryListPage";
import { CategoryFormPage } from "@/pages/CategoryFormPage";
import { ProductListPage } from "@/pages/ProductListPage";
import { ProductFormPage } from "@/pages/ProductFormPage";
import { ProductListPageV2 } from "@/pages/ProductListPageV2";
import { ProductFormPageV2 } from "@/pages/ProductFormPageV2";
import { CarrinhoCompra } from "@/pages/CarrinhoCompra";
import { ProdutoDetalhe } from "@/pages/ProdutoDetalhe";


export function BaseRoutes(){
    return(
        <Routes>
            {/*Protected Routes*/}
            <Route element={<AuthenticationRoutes />}>        
                <Route path="/categories" element={<CategoryListPage/>}/>
                <Route path="/categories/new" element={<CategoryFormPage/>}/>
                <Route path="/categories/:id" element={<CategoryFormPage/>}/>
                <Route path="/products" element={<ProductListPage/>}/>
                <Route path="/products/new" element={<ProductFormPage/>}/>
                <Route path="/products/:id" element={<ProductFormPage/>}/>
                <Route path="/products-v2" element={<ProductListPageV2/>}/>
                <Route path="/products-v2/new" element={<ProductFormPageV2/>}/>
                <Route path="/products-v2/:id" element={<ProductFormPageV2/>}/>
                
            </Route>
           {/*Public Routes */}
           <Route path="/signup" element={<UserSignUpPage/>}/>
           <Route path="/login" element={<LoginPage/>}/>
           <Route path="/" element={<HomePage/>}/>
           <Route path="/home" element={<HomePage/>}/>
           <Route path="/cart" element={<CarrinhoCompra/>}/>
           <Route path="/produto-detalhe/:id" element={<ProdutoDetalhe/>}/>

        </Routes>
    )
}