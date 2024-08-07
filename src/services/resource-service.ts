import { AxiosResponse } from 'axios'

import { axiosClient } from '~/plugins/axiosClient'
import { appApi } from '~/redux/apiSlice'

import { URLs } from '~/constants/request'
import {
  GetResourcesParams,
  GetResourcesCategoriesParams,
  ItemsWithCount,
  Question,
  Categories,
  CreateQuestionData,
  CategoryNameInterface,
  CreateCategoriesParams,
  UpdateQuestionParams,
  GetQuestion,
  UpdateResourceCategory,
  ApiMethodEnum,
  CreateQuizParams,
  UpdateQuizParams,
  Quiz,
  Lesson
} from '~/types'
import { createUrlPath } from '~/utils/helper-functions'

export const ResourceService = {
  getQuestions: (
    params?: GetResourcesParams
  ): Promise<AxiosResponse<ItemsWithCount<Question>>> => {
    return axiosClient.get(URLs.resources.questions.get, { params })
  },
  getAttachments: (): string => {
    return 'Not implemented yet'
  },
  editLesson: (): Lesson => {
    return {
      title: '',
      category: {
        name: ''
      },
      updatedAt: ''
    }
  },
  getQuestion: async (id?: string): Promise<AxiosResponse<GetQuestion>> =>
    await axiosClient.get(createUrlPath(URLs.resources.questions.get, id)),
  createQuestion: async (data?: CreateQuestionData): Promise<AxiosResponse> => {
    return await axiosClient.post(URLs.resources.questions.post, data)
  },
  updateQuestion: async (params?: UpdateQuestionParams) =>
    await axiosClient.patch(
      createUrlPath(URLs.resources.questions.patch, params?.id),
      params
    ),
  deleteQuestion: async (id: string): Promise<AxiosResponse> =>
    await axiosClient.delete(
      createUrlPath(URLs.resources.questions.delete, id)
    ),
  getResourcesCategories: (
    params?: GetResourcesCategoriesParams
  ): Promise<AxiosResponse<ItemsWithCount<Categories>>> => {
    return axiosClient.get(URLs.resources.resourcesCategories.get, { params })
  },
  getResourcesCategoriesNames: (): Promise<
    AxiosResponse<CategoryNameInterface[]>
  > => axiosClient.get(URLs.resources.resourcesCategories.getNames),
  createResourceCategory: async (
    params?: CreateCategoriesParams
  ): Promise<AxiosResponse<Categories>> =>
    await axiosClient.post(URLs.resources.resourcesCategories.post, params),
  deleteResourceCategory: async (id: string): Promise<AxiosResponse> =>
    await axiosClient.delete(
      createUrlPath(URLs.resources.resourcesCategories.delete, id)
    ),
  getQuiz: (id?: string): Promise<AxiosResponse<Quiz>> => {
    return ResourceService.getQuiz(id)
  },

  addQuiz: async (data: CreateQuizParams): Promise<AxiosResponse<Quiz>> => {
    return await axiosClient.post(URLs.resources.quizzes.post, data)
  },

  editQuiz: async (params: UpdateQuizParams): Promise<AxiosResponse<Quiz>> => {
    return await axiosClient.patch(
      createUrlPath(URLs.resources.quizzes.patch, params.id),
      params
    )
  }
}

export const resourceService = appApi.injectEndpoints({
  endpoints: (build) => ({
    updateResourceCategory: build.mutation<void, UpdateResourceCategory>({
      query: (params) => ({
        url: createUrlPath(URLs.resources.resourcesCategories.patch, params.id),
        method: ApiMethodEnum.PATCH,
        body: { ...params }
      })
    })
  })
})

export const { useUpdateResourceCategoryMutation } = resourceService
