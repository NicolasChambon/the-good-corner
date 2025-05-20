import { gql } from "@apollo/client";

export const GET_ALL_ADS = gql`
  query GetAllAds($category: Float, $search: String) {
    getAllAds(category: $category, search: $search) {
      id
      title
      price
      pictureUrl
    }
  }
`;

export const GET_ONE_AD = gql`
  query GetOneAd($getOneAdId: Float!) {
    getOneAd(id: $getOneAdId) {
      id
      title
      description
      author
      price
      pictureUrl
      city
      createdAt
      category {
        label
      }
      tags {
        id
        label
      }
    }
  }
`;

export const DELETE_AD = gql`
  mutation DeleteAd($deleteAdId: Float!) {
    deleteAd(id: $deleteAdId)
  }
`;

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    getAllCategories {
      id
      label
    }
  }
`;

export const GET_ALL_TAGS = gql`
  query GetAllTags {
    getAllTags {
      id
      label
    }
  }
`;
