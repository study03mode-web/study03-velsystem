import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { 
  MapPin, 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  Home, 
  Building2, 
  Star,
  Phone,
  User
} from 'lucide-react';
import { toast } from 'react-toastify';
import { 
  useAddresses, 
  useCreateAddress, 
  useUpdateAddress, 
  useDeleteAddress,
  Address,
  CreateAddressRequest 
} from '../../hooks/useAddresses';

const addressSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(/^[+]?[\d\s-()]+$/, 'Please enter a valid phone number'),
  address: yup
    .string()
    .required('Address is required')
    .min(10, 'Address must be at least 10 characters')
    .max(500, 'Address must be less than 500 characters'),
  city: yup
    .string()
    .required('City is required')
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City must be less than 100 characters'),
  state: yup
    .string()
    .required('State is required')
    .min(2, 'State must be at least 2 characters')
    .max(100, 'State must be less than 100 characters'),
  country: yup
    .string()
    .required('Country is required')
    .min(2, 'Country must be at least 2 characters')
    .max(100, 'Country must be less than 100 characters'),
  pinCode: yup
    .string()
    .required('PIN code is required')
    .matches(/^\d{6}$/, 'PIN code must be 6 digits'),
  landmark: yup
    .string()
    .max(200, 'Landmark must be less than 200 characters'),
  alternatePhone: yup
    .string()
    .matches(/^[+]?[\d\s-()]*$/, 'Please enter a valid phone number'),
  addressType: yup
    .string()
    .required('Address type is required'),
  isDefault: yup.boolean(),
});

type AddressFormData = CreateAddressRequest;

const Addresses = React.memo(() => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  // Fetch addresses
  const { data: addressesData, isLoading } = useAddresses();
  
  // Mutations
  const createAddressMutation = useCreateAddress();
  const updateAddressMutation = useUpdateAddress();
  const deleteAddressMutation = useDeleteAddress();

  const addresses = addressesData?.data || [];

  // Form setup
  const form = useForm<AddressFormData>({
    resolver: yupResolver(addressSchema),
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      country: 'India',
      pinCode: '',
      landmark: '',
      alternatePhone: '',
      addressType: '0',
      isDefault: false,
    },
  });

  const handleOpenForm = (address?: Address) => {
    if (address) {
      setEditingAddress(address);
      form.reset({
        name: address.name,
        phone: address.phone,
        address: address.address,
        city: address.city,
        state: address.state,
        country: address.country,
        pinCode: address.pinCode,
        landmark: address.landmark || '',
        alternatePhone: address.alternatePhone || '',
        addressType: address.addressType,
        isDefault: address.isDefault,
      });
    } else {
      setEditingAddress(null);
      form.reset({
        name: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        country: 'India',
        pinCode: '',
        landmark: '',
        alternatePhone: '',
        addressType: '0',
        isDefault: false,
      });
    }
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingAddress(null);
    form.reset();
  };

  const handleSubmit = (data: AddressFormData) => {
    if (editingAddress) {
      updateAddressMutation.mutate(
        { id: editingAddress.id, data },
        {
          onSuccess: () => {
            toast.success('Address updated successfully!');
            handleCloseForm();
          },
          onError: (error: Error) => {
            toast.error(error.message || 'Failed to update address');
          },
        }
      );
    } else {
      createAddressMutation.mutate(data, {
        onSuccess: () => {
          toast.success('Address added successfully!');
          handleCloseForm();
        },
        onError: (error: Error) => {
          toast.error(error.message || 'Failed to add address');
        },
      });
    }
  };

  const handleDelete = (id: string) => {
    deleteAddressMutation.mutate(id, {
      onSuccess: () => {
        toast.success('Address deleted successfully!');
        setDeleteConfirm(null);
      },
      onError: (error: Error) => {
        toast.error(error.message || 'Failed to delete address');
      },
    });
  };

  const getAddressTypeIcon = (type: string) => {
    switch (type) {
      case '1':
        return <Building2 size={16} className="text-blue-600" />;
      default:
        return <Home size={16} className="text-green-600" />;
    }
  };

  const getAddressTypeLabel = (type: string) => {
    switch (type) {
      case '1':
        return 'Work';
      default:
        return 'Home';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b bg-gradient-to-r from-purple-50 to-pink-50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Saved Addresses</h2>
                <p className="text-sm text-gray-600">Manage your delivery addresses</p>
              </div>
            </div>
            <button
              onClick={() => handleOpenForm()}
              className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm hover:shadow-md"
            >
              <Plus size={16} />
              <span>Add Address</span>
            </button>
          </div>
        </div>

        {/* Addresses List */}
        <div className="p-6">
          {addresses.length === 0 ? (
            <div className="text-center py-12">
              <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No addresses saved</h3>
              <p className="text-gray-600 mb-4">Add your first address to get started</p>
              <button
                onClick={() => handleOpenForm()}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
              >
                Add Address
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={`border-2 rounded-xl p-6 transition-all duration-200 hover:shadow-md ${
                    address.isDefault
                      ? 'border-purple-200 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {getAddressTypeIcon(address.addressType)}
                      <span className="font-semibold text-gray-900">
                        {getAddressTypeLabel(address.addressType)}
                      </span>
                      {address.isDefault && (
                        <div className="flex items-center space-x-1 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                          <Star size={12} />
                          <span>Default</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleOpenForm(address)}
                        className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(address.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-gray-700">
                      <User size={14} />
                      <span className="font-medium">{address.name}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-700">
                      <Phone size={14} />
                      <span>{address.phone}</span>
                    </div>
                    <div className="flex items-start space-x-2 text-gray-700">
                      <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                      <div className="text-sm leading-relaxed">
                        <p>{address.address}</p>
                        {address.landmark && <p className="text-gray-600">Near {address.landmark}</p>}
                        <p>{address.city}, {address.state} - {address.pinCode}</p>
                        <p>{address.country}</p>
                      </div>
                    </div>
                    {address.alternatePhone && (
                      <div className="flex items-center space-x-2 text-gray-600 text-sm">
                        <Phone size={12} />
                        <span>Alt: {address.alternatePhone}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Address Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">
                  {editingAddress ? 'Edit Address' : 'Add New Address'}
                </h3>
                <button
                  onClick={handleCloseForm}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>
            </div>

            <form onSubmit={form.handleSubmit(handleSubmit)} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    {...form.register('name')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="Enter full name"
                  />
                  {form.formState.errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    {...form.register('phone')}
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="Enter phone number"
                  />
                  {form.formState.errors.phone && (
                    <p className="mt-1 text-sm text-red-600">
                      {form.formState.errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <textarea
                  {...form.register('address')}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="Enter complete address"
                />
                {form.formState.errors.address && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.address.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    {...form.register('city')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="Enter city"
                  />
                  {form.formState.errors.city && (
                    <p className="mt-1 text-sm text-red-600">
                      {form.formState.errors.city.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    {...form.register('state')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="Enter state"
                  />
                  {form.formState.errors.state && (
                    <p className="mt-1 text-sm text-red-600">
                      {form.formState.errors.state.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    PIN Code *
                  </label>
                  <input
                    {...form.register('pinCode')}
                    type="text"
                    maxLength={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="Enter PIN code"
                  />
                  {form.formState.errors.pinCode && (
                    <p className="mt-1 text-sm text-red-600">
                      {form.formState.errors.pinCode.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country *
                  </label>
                  <input
                    {...form.register('country')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="Enter country"
                  />
                  {form.formState.errors.country && (
                    <p className="mt-1 text-sm text-red-600">
                      {form.formState.errors.country.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Landmark
                  </label>
                  <input
                    {...form.register('landmark')}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="Enter landmark (optional)"
                  />
                  {form.formState.errors.landmark && (
                    <p className="mt-1 text-sm text-red-600">
                      {form.formState.errors.landmark.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alternate Phone
                  </label>
                  <input
                    {...form.register('alternatePhone')}
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="Enter alternate phone (optional)"
                  />
                  {form.formState.errors.alternatePhone && (
                    <p className="mt-1 text-sm text-red-600">
                      {form.formState.errors.alternatePhone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address Type *
                  </label>
                  <select
                    {...form.register('addressType')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  >
                    <option value="0">Home</option>
                    <option value="1">Work</option>
                  </select>
                  {form.formState.errors.addressType && (
                    <p className="mt-1 text-sm text-red-600">
                      {form.formState.errors.addressType.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                <input
                  {...form.register('isDefault')}
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label className="ml-2 text-sm text-gray-700">
                  Set as default address
                </label>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  disabled={createAddressMutation.isPending || updateAddressMutation.isPending}
                  className="flex-1 flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  <Save size={16} />
                  <span>
                    {createAddressMutation.isPending || updateAddressMutation.isPending
                      ? 'Saving...'
                      : editingAddress
                      ? 'Update Address'
                      : 'Save Address'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Address</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this address? This action cannot be undone.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  disabled={deleteAddressMutation.isPending}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  {deleteAddressMutation.isPending ? 'Deleting...' : 'Delete'}
                </button>
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

Addresses.displayName = 'Addresses';

export default Addresses;