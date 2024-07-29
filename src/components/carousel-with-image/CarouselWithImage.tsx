import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SwipeableViews from 'react-swipeable-views'

import Box from '@mui/material/Box'
import MobileStepper from '@mui/material/MobileStepper'
import Typography from '@mui/material/Typography'

import { AccordionWithImageItem } from '~/types'
import { styles } from '~/components/carousel-with-image/CarouselWithImage.styles'

interface CarouselWithImageProps {
  items: AccordionWithImageItem[]
}

const CarouselWithImage: FC<CarouselWithImageProps> = ({ items }) => {
  const { t } = useTranslation()
  const [activeStep, setActiveStep] = useState<number>(0)

  const handleStepChange = (step: number) => {
    setActiveStep(step)
  }

  return (
    <Box data-testid='carousel' sx={styles.feature}>
      <Box
        alt={items[0].image}
        component='img'
        src={items[0].image}
        sx={styles.image}
      />
      <SwipeableViews
        enableMouseEvents
        index={activeStep}
        onChangeIndex={handleStepChange}
      >
        {items.map((item, index) => (
          <Box key={index} sx={styles.text}>
            <Typography sx={styles.title}>{t(item.title)}</Typography>
            <Typography sx={styles.description}>
              {t(item.description)}
            </Typography>
          </Box>
        ))}
      </SwipeableViews>
      <MobileStepper
        activeStep={activeStep}
        backButton={null}
        nextButton={null}
        position='static'
        steps={items.length}
        sx={styles.steper}
        variant='dots'
      />
    </Box>
  )
}
export default CarouselWithImage
