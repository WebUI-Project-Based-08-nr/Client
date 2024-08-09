import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import subjectsImage from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import { useTranslation } from 'react-i18next'
import AppSelect from '~/components/app-select/AppSelect'
import AppButton from '~/components/app-button/AppButton'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import AppChipList from '~/components/app-chips-list/AppChipList'

const SubjectsStep = ({ btnsBox }) => {
  const { t } = useTranslation()

  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [categoryOptions, setCategoryOptions] = useState([])
  const [subjectOptions, setSubjectOptions] = useState([])
  const [selectedSubjects, setSelectedSubjects] = useState([])
  const [loading] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getCategoriesNames()
        const categories = response.data.map((category) => ({
          title: `${category.name} Category: ${category.name}`,
          value: category.name
        }))
        setCategoryOptions(categories)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  const handleCategoryChange = async (value) => {
    setSelectedCategory(value)

    try {
      const response = await subjectService.getSubjectsNames(value)
      const subjects = response.data.map((subject) => ({
        title: `${subject.name} Category: ${value}`,
        value: subject.name
      }))
      setSubjectOptions(subjects)
    } catch (error) {
      console.error('Error fetching subjects:', error)
    }
    setSelectedSubject('')
  }

  const handleSubjectChange = (value) => {
    setSelectedSubject(value)
  }

  const handleAddSubject = () => {
    if (selectedSubject && !selectedSubjects.includes(selectedSubject)) {
      setSelectedSubjects([...selectedSubjects, selectedSubject])
      setSelectedSubject('')
    }
  }

  const handleChipDelete = (item) => {
    setSelectedSubjects(selectedSubjects.filter((subject) => subject !== item))
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.imgContainer}>
        <Box component='img' src={subjectsImage} sx={styles.img} />
      </Box>
      <Box sx={styles.rightBox}>
        <TitleWithDescription
          style={styles.titleWithDescription}
          title={t('becomeTutor.categories.title')}
        />
        <Box sx={styles.selectContainer}>
          <AppSelect
            fields={categoryOptions}
            label={t('becomeTutor.categories.mainSubjectsLabel')}
            setValue={handleCategoryChange}
            sx={styles.select}
            value={selectedCategory}
          />
          <AppSelect
            fields={subjectOptions}
            label={t('becomeTutor.categories.subjectLabel')}
            setValue={handleSubjectChange}
            sx={styles.select}
            value={selectedSubject}
          />
        </Box>
        <AppButton
          disabled={!(Boolean(selectedCategory) && Boolean(selectedSubject))}
          loading={loading}
          onClick={handleAddSubject}
          sx={styles.submitButton}
          title='ok'
        >
          {t('becomeTutor.categories.btnText')}
        </AppButton>
        <AppChipList
          defaultQuantity={2}
          handleChipDelete={handleChipDelete}
          items={selectedSubjects}
          wrapperStyle={styles.chips}
        />
        <Box sx={styles.btnsWrapper}>{btnsBox}</Box>
      </Box>
    </Box>
  )
}

export default SubjectsStep
