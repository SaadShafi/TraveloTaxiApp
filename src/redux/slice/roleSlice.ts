import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ServiceItem {
  _id: string;
  name: string;
  text: string;
  charge: string;
  image: { uri: string };
}

interface ServicesState {
  homeServices: ServiceItem[];
  shopServices: ServiceItem[];
}

interface UserProfile {
  _id?: string;
  profilePic?: string | null;
  email?: string;
  phoneNumber?: string;
  bio?: string;
  gender?: string;
  dateOfBirth?: string;
  fullName?: string;
}
interface RoleState {
  selectedRole: any | number | null;
  user: any;
  userAuthToken: any;
  token: any;
  userEmail: string;
  isLogin: boolean;
  fullName: string;
  profileUser: UserProfile | null;
  userId: string;
  serviceId: string;
  services: ServicesState;
  profilePic: any;
  freelancerId: string;
  freelancerName: string;
  freelancerLocation: string;
  freelancerRating: string;
  specialOfferName: string;
  specialOfferPrice: string;
  chatId: string;
  languageSelect: string;
}

const initialState: RoleState = {
  selectedRole: null,
  user: {},
  userAuthToken: '',
  token: '',
  userEmail: '',
  isLogin: false,
  fullName: '',
  profileUser: null,
  userId: '',
  serviceId: '',
  services: {
    homeServices: [],
    shopServices: [],
  },
  profilePic: null,
  freelancerId: '',
  freelancerName: '',
  freelancerLocation: '',
  freelancerRating: '',
  specialOfferName: '',
  specialOfferPrice: '',
  chatId: '',
  languageSelect: '',
} satisfies RoleState as RoleState;

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<string | number>) => {
      state.selectedRole = action.payload;
    },
    clearRole: state => {
      state.selectedRole = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.userAuthToken = action.payload;
    },
    setLogin: state => {
      state.isLogin = true;
    },
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    setFullName: (state, action) => {
      state.fullName = action.payload;
    },
    removeUser: state => {
      state.user = {};
      state.userAuthToken = null;
      state.isLogin = false;
    },
    setUserProfiles: (state, action: PayloadAction<UserProfile>) => {
      state.profileUser = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setServiceId: (state, action) => {
      state.serviceId = action.payload;
    },
    setFreelancerId: (state, action) => {
      state.freelancerId = action.payload;
    },
    setServices: (state, action: PayloadAction<ServicesState>) => {
      state.services = action.payload;
    },
    setHomeServices: (state, action: PayloadAction<ServiceItem[]>) => {
      state.services.homeServices = action.payload;
    },
    setShopServices: (state, action: PayloadAction<ServiceItem[]>) => {
      state.services.shopServices = action.payload;
    },
    setProfilePic: (state, action) => {
      state.profilePic = action.payload;
    },
    setFreelancerName: (state, action) => {
      state.freelancerName = action.payload;
    },
    setFreelancerLocation: (state, action) => {
      state.freelancerLocation = action.payload;
    },
    setFreelancerRating: (state, action) => {
      state.freelancerRating = action.payload;
    },
    setSpecialOfferName: (state, action) => {
      state.specialOfferName = action.payload;
    },
    setSpecialOfferPrice: (state, action) => {
      state.specialOfferPrice = action.payload;
    },
    setChatId: (state, action) => {
      state.chatId = action.payload;
    },
    setLanguageSelect: (state, action) => {
      state.languageSelect = action.payload;
    },
  },
});

export const {
  setRole,
  clearRole,
  setUser,
  setToken,
  setLogin,
  setUserEmail,
  removeUser,
  setFullName,
  setUserProfiles,
  setUserId,
  setServiceId,
  setServices,
  setHomeServices,
  setShopServices,
  setProfilePic,
  setFreelancerId,
  setFreelancerName,
  setFreelancerLocation,
  setFreelancerRating,
  setSpecialOfferPrice,
  setSpecialOfferName,
  setChatId,
  setLanguageSelect,
} = roleSlice.actions;
export default roleSlice.reducer;
