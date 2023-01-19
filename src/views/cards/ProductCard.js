// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Rating from '@mui/material/Rating'
import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Grid from '@mui/material/Grid'

// ** Icons Imports
import CartPlus from 'mdi-material-ui/CartPlus'

// Styled Grid component
const StyledGrid1 = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  [theme.breakpoints.down('md')]: {
    paddingTop: '0 !important'
  },
  '& .MuiCardContent-root': {
    padding: theme.spacing(3, 4.75),
    [theme.breakpoints.down('md')]: {
      paddingTop: 0
    }
  }
}))

// Styled Grid component
const StyledGrid2 = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.up('md')]: {
    paddingLeft: '0 !important'
  },
  [theme.breakpoints.down('md')]: {
    order: -1
  }
}))

// Styled component for the image
const Img = styled('img')(({ theme }) => ({
  height: '11rem',
  width: '11rem',
  borderRadius: theme.shape.borderRadius,
  objectFit: 'cover'
}))

const ProductCard = (props) => {
  const product = props.product;

  return (
    <Card>
      <Grid container spacing={6}>
        <StyledGrid1 item xs={12} md={6} lg={7}>
          <CardContent>
            <Typography variant='h6'>
              {product?.title}
            </Typography>
            <Typography variant="caption" display="block" sx={{ marginBottom: 2 }}>
              {product.brand} | {product.category}
            </Typography>
            <Box sx={{ mb: 4.75, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <Rating readOnly value={product.rating} name='read-only' precision={0.5} sx={{ marginRight: 2 }} />
              <Typography variant='body2'>{product.rating}</Typography>
            </Box>
            <Typography variant='body2' sx={{ marginBottom: 4 }}>
              {product?.description}
            </Typography>
            <Typography sx={{ fontWeight: 500, marginBottom: 3 }}>
              Price:{' '}
              <Box component='span' sx={{ fontWeight: 'bold' }}>
                ${product.price}
              </Box>
            </Typography>
            <Typography variant="body2">
              Stock:{' '}
              <Box component='span'>
                {product.stock}
              </Box>
            </Typography>
          </CardContent>
          <CardActions className='card-action-dense' sx={{ width: '100%', marginTop: "auto" }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Button>
                <CartPlus fontSize='small' sx={{ marginRight: 2 }} />
                Add to Card
              </Button>
            </Box>
          </CardActions>
        </StyledGrid1>
        <StyledGrid2 item xs={12} md={6} lg={5}>
          <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Img alt='Stumptown Roasters' src={product.thumbnail} />
          </CardContent>
        </StyledGrid2>
      </Grid>
    </Card>
  )
}

export default ProductCard
