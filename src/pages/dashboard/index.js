// ** MUI Imports
import Grid from '@mui/material/Grid'
import TablePagination from '@mui/material/TablePagination'
import Card from '@mui/material/Card'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import DashboardCardHeader from 'src/views/dashboard/DashboardCardHeader'
import ProductCard from 'src/views/cards/ProductCard'

//Router
import { useRouter } from 'next/router'
import { useContext, useEffect, useState, useRef } from 'react'
import { AuthContext } from 'src/context/auth-context'

//Axios
import axios from 'axios'

//Context
import { DashboardContext } from 'src/context/dashboard-context'

const Dashboard = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  //Context
  const { search, category } = useContext(DashboardContext);

  //State
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(6)
  const [total, setTotal] = useState(100)
  const [products, setProducts] = useState([])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  useEffect(() => {
    // checks if the user is authenticated
    authContext.isUserAuthenticated()
      ? router.push("/dashboard")
      : router.push("/");
  }, [authContext.authState]);

  useEffect(() => {
    const controller = new AbortController();

    if (authContext.isUserAuthenticated()) {
      const fetchData = async () => {

        //get products data by search
        if (search && category === '') {
          await axios.get(`https://dummyjson.com/products/search?q=${search}`)
            .then((res) => {
              setProducts(res.data.products)
              setTotal(res.data.total)
            })
            .catch((error) => {
              console.log(error)
            })

          //get products data by categories
        } else if (search === '' && category) {
          await axios.get(`https://dummyjson.com/products/category/${category}`)
            .then((res) => {
              setProducts(res.data.products)
              setTotal(res.data.total)
            })
            .catch((error) => {
              console.log(error)
            })

          //get products data by pagination
        } else {
          await axios.get(`https://dummyjson.com/products?limit=${rowsPerPage}&skip=${page * rowsPerPage}`)
            .then((res) => {
              setProducts(res.data.products)
              setTotal(res.data.total)
            })
            .catch((error) => {
              console.log(error)
            })
        };
      }

      fetchData();
    }

    return () => {
      controller.abort()
    }
  }, [page, rowsPerPage, search, category])


  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <DashboardCardHeader />
        </Grid>
        {products.map((product) =>
          <Grid item xs={12} md={6} lg={4} key={product.id}>
            <ProductCard
              product={product}
            />
          </Grid>
        )}
        {!search && !category ?
          <Grid item xs={12} md={12}>
            <Card>
              <TablePagination
                rowsPerPageOptions={[2, 3, 6, 12]}
                component='div'
                count={total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </Grid> : null
        }
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
