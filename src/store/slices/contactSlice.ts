
import { ContactType } from '@/types/contact';
import { createSlice} from '@reduxjs/toolkit';

// Giá trị mặc định của state
const initialState = {
  contact: <ContactType[]>[
    {
      customer_name:'',
      email: '',
      phone_number: '',
      title: '',
      description: '',
      _id: '',
    },
  ],
};

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    setContact: (state, action) => {
      state.contact = action.payload;
    },
    clearContact: (state) => {
      state.contact = initialState.contact;
    },
  },
});

export const { setContact, clearContact } = contactSlice.actions;

export default contactSlice.reducer;
