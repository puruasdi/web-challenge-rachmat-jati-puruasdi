// ** MUI Imports
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { styled, useTheme } from '@mui/material/styles'
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid'

//React
import { useContext } from 'react'

//Context
import { DashboardContext } from 'src/context/dashboard-context'

// Styled component for the triangle shaped background image
const TriangleImg = styled('img')({
  right: 0,
  bottom: 0,
  height: 170,
  position: 'absolute'
})

//Categories
const categories = [
  "smartphones",
  "laptops",
  "fragrances",
  "skincare",
  "groceries",
  "home-decoration",
  "furniture",
  "tops",
  "womens-dresses",
  "womens-shoes",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "womens-watches",
  "womens-bags",
  "womens-jewellery",
  "sunglasses",
  "automotive",
  "motorcycle",
  "lighting"
]

const DashboardCardHeader = () => {

  //Context
  const { search, setSearch, category, setCategory } = useContext(DashboardContext);

  // ** Hook
  const theme = useTheme()
  const imageSrc = theme.palette.mode === 'light' ? 'triangle-light.png' : 'triangle-dark.png'

  function handleClick(data) {
    setSearch('')
    setCategory(data)
  }

  return (
    <>
      <Card sx={{ position: 'relative' }}>
        <CardContent>
          <Grid container spacing={2}>
            {categories.map(data =>
              <Grid key={data} sx={{ mx: 1, mb: 1 }}>
                <Button
                  size="small"
                  variant={data === category ? 'contained' : 'text'}
                  onClick={() => handleClick(data)}
                >
                  <span style={{ fontSize: "0.8em" }}>
                    {data}
                  </span>
                </Button>
              </Grid>
            )}
          </Grid>
          {search ?
            <Typography variant='overline'>Hasil pencarian untuk "{search}"</Typography> : null
          }
          <TriangleImg alt='triangle background' src={`/images/misc/${imageSrc}`} />
        </CardContent>
      </Card>
      {search ?
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Typography variant='overline'>Hasil pencarian untuk "{search}"</Typography>
          </CardContent>
        </Card >
        : null
      }
    </>
  )
}

export default DashboardCardHeader
