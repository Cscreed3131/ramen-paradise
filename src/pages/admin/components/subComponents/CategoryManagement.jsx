import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import categoryService from '../../../../firebase/CategoryService';

function CategoryManagement() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [statusMessage, setStatusMessage] = useState({ type: '', message: '' });
    
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm({
        defaultValues: {
            name: '',
            description: '',
            active: true
        }
    });
    
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (statusMessage.message) {
            const timer = setTimeout(() => {
                setStatusMessage({ type: '', message: '' });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [statusMessage]);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const fetchedCategories = await categoryService.getAllCategories();
            
            const categoriesWithCounts = await Promise.all(
                fetchedCategories.map(async (category) => {
                    const productCount = await categoryService.countProductsInCategory(category.id);
                    return { ...category, products: productCount };
                })
            );
            
            setCategories(categoriesWithCounts);
            setError(null);
        } catch (err) {
            console.error('Error fetching categories:', err);
            setError('Failed to load categories. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const filteredCategories = categories.filter(category => 
        category.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            
            if (isEditing && editingId) {
                await categoryService.updateCategory(editingId, data);
                setStatusMessage({ 
                    type: 'success', 
                    message: 'Category updated successfully' 
                });
            } else {
                await categoryService.createCategory(data);
                setStatusMessage({ 
                    type: 'success', 
                    message: 'Category created successfully' 
                });
            }
            
            await fetchCategories();
            resetForm();
            
        } catch (err) {
            console.error('Error saving category:', err);
            setStatusMessage({ 
                type: 'error', 
                message: isEditing ? 'Failed to update category' : 'Failed to create category'
            });
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        reset({
            name: '',
            description: '',
            active: true
        });
        setIsEditing(false);
        setEditingId(null);
    };

    const handleEdit = (category) => {
        setValue('name', category.name);
        setValue('description', category.description);
        setValue('active', category.active);
        setIsEditing(true);
        setEditingId(category.id);
    };

    const handleDeleteClick = (category) => {
        setCategoryToDelete(category);
        setShowConfirmDelete(true);
    };

    const confirmDelete = async () => {
        if (categoryToDelete) {
            try {
                setLoading(true);
                await categoryService.deleteCategory(categoryToDelete.id);
                setCategories(categories.filter(c => c.id !== categoryToDelete.id));
                setStatusMessage({ 
                    type: 'success', 
                    message: 'Category deleted successfully' 
                });
            } catch (err) {
                console.error('Error deleting category:', err);
                setStatusMessage({ 
                    type: 'error', 
                    message: 'Failed to delete category' 
                });
            } finally {
                setLoading(false);
                setShowConfirmDelete(false);
                setCategoryToDelete(null);
            }
        }
    };

    const cancelDelete = () => {
        setShowConfirmDelete(false);
        setCategoryToDelete(null);
    };

    const toggleStatus = async (id, currentStatus) => {
        try {
            setLoading(true);
            await categoryService.toggleCategoryStatus(id, currentStatus);
            setCategories(categories.map(category => 
                category.id === id ? { ...category, active: !currentStatus } : category
            ));
            setStatusMessage({ 
                type: 'success', 
                message: `Category ${!currentStatus ? 'activated' : 'deactivated'} successfully` 
            });
        } catch (err) {
            console.error('Error toggling category status:', err);
            setStatusMessage({ 
                type: 'error', 
                message: 'Failed to update category status' 
            });
        } finally {
            setLoading(false);
        }
    };

    // Add scrollbar hiding CSS
    const scrollbarHideStyles = `
        .hide-scrollbar {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;     /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
            display: none;             /* Chrome, Safari and Opera */
        }
    `;

    return (
        <div className="flex flex-col space-y-6">
            {/* Add the scrollbar hiding styles */}
            <style>{scrollbarHideStyles}</style>
            {/* Header */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-white">
                    Category <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">Management</span>
                  </h2>
                  <p className="text-gray-400 mt-2">
                    Update existing products in your menu
                  </p>
                  <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mt-4"></div>
                </div>
              </div>
            </div>

            {/* Status Message */}
            {statusMessage.message && (
                <div className={`rounded-md p-4 mb-4 ${
                    statusMessage.type === 'success' 
                        ? 'bg-green-900/20 border border-green-500/30 text-green-400' 
                        : 'bg-red-900/20 border border-red-500/30 text-red-400'
                }`}>
                    {statusMessage.message}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Category Form */}
                <div className="col-span-1">
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">
                            {isEditing ? 'Edit Category' : 'Add New Category'}
                        </h3>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                                        Category Name
                                    </label>
                                    <input
                                        id="name"
                                        {...register('name', { required: 'Category name is required' })}
                                        className="mt-1 block w-full rounded-md bg-gray-700/50 border border-gray-600 focus:border-yellow-500 focus:ring focus:ring-yellow-500/20 focus:ring-opacity-50 text-white py-2 px-3"
                                        placeholder="Enter category name"
                                        disabled={loading}
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                                    )}
                                </div>
                                
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        {...register('description')}
                                        rows={3}
                                        className="mt-1 block w-full rounded-md bg-gray-700/50 border border-gray-600 focus:border-yellow-500 focus:ring focus:ring-yellow-500/20 focus:ring-opacity-50 text-white py-2 px-3 resize-none hide-scrollbar"
                                        placeholder="Enter category description"
                                        disabled={loading}
                                    ></textarea>
                                </div>
                                
                                <div className="flex items-center">
                                    <input
                                        id="active"
                                        type="checkbox"
                                        {...register('active')}
                                        className="h-4 w-4 text-yellow-500 focus:ring-yellow-500/30 border-gray-600 rounded bg-gray-700"
                                        disabled={loading}
                                    />
                                    <label htmlFor="active" className="ml-2 block text-sm font-medium text-gray-300">
                                        Active
                                    </label>
                                </div>
                                
                                <div className="flex justify-between pt-4">
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white bg-gray-700/50 hover:bg-gray-700 rounded-md transition-colors"
                                        disabled={loading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 rounded-md transition-colors flex items-center"
                                        disabled={loading}
                                    >
                                        {loading && (
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        )}
                                        {isEditing ? 'Update Category' : 'Add Category'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                
                {/* Categories List */}
                                <div className="col-span-1 lg:col-span-2">
                                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-lg font-semibold text-white">
                                                Categories
                                            </h3>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    className="rounded-md bg-gray-700/50 border border-gray-600 focus:border-yellow-500 focus:ring focus:ring-yellow-500/20 focus:ring-opacity-50 text-white py-2 pl-10 pr-3 w-48 sm:w-64"
                                                    placeholder="Search categories"
                                                />
                                                <div className="absolute left-3 top-2.5">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        {loading && categories.length === 0 ? (
                                            <div className="flex justify-center items-center py-20">
                                                <svg className="animate-spin h-8 w-8 text-yellow-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            </div>
                                        ) : error ? (
                                            <div className="bg-red-900/20 text-red-400 border border-red-900/50 rounded-lg p-4">
                                                {error}
                                                <button onClick={fetchCategories} className="ml-2 underline">Try again</button>
                                            </div>
                                        ) : filteredCategories.length > 0 ? (
                                            <div className="overflow-x-auto hide-scrollbar">
                                                <table className="min-w-full divide-y divide-gray-700">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                                                Category
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                                                Products
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                                                Status
                                                            </th>
                                                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                                                                Actions
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-transparent divide-y divide-gray-700">
                                                        {filteredCategories.map((category) => (
                                                            <tr key={category.id} className="hover:bg-gray-700/30 transition-colors">
                                                                <td className="px-6 py-4 whitespace-normal break-words">
                                                                    <div className="text-sm font-medium text-white">{category.name}</div>
                                                                    <div className="text-sm text-gray-400">{category.description}</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <div className="text-sm text-gray-300">{category.products}</div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    <span 
                                                                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer
                                                                            ${category.active 
                                                                                ? 'bg-green-900/40 text-green-400 border border-green-400/30' 
                                                                                : 'bg-gray-700/50 text-gray-400 border border-gray-600'}`}
                                                                        onClick={() => toggleStatus(category.id, category.active)}
                                                                    >
                                                                        {category.active ? 'Active' : 'Inactive'}
                                                                    </span>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                    <button 
                                                                        onClick={() => handleEdit(category)}
                                                                        className="text-yellow-500 hover:text-yellow-400 mr-3"
                                                                        disabled={loading}
                                                                    >
                                                                        Edit
                                                                    </button>
                                                                    <button 
                                                                        onClick={() => handleDeleteClick(category)}
                                                                        className="text-red-500 hover:text-red-400"
                                                                        disabled={loading}
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : (
                                            <div className="bg-gray-700/20 rounded-lg p-8 text-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                </svg>
                                                <p className="mt-4 text-gray-400">No categories found. {searchTerm && 'Try a different search term or'} Add a new category.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Delete Confirmation Modal */}
            {showConfirmDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center backdrop-blur-sm z-50">
                    <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 max-w-md mx-auto">
                        <div className="flex items-center justify-center mb-4">
                            <div className="h-12 w-12 rounded-full bg-red-500/20 flex items-center justify-center text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-white text-center mb-2">Delete Category</h3>
                        <p className="text-gray-400 text-center mb-6">
                            Are you sure you want to delete "{categoryToDelete?.name}"? This action cannot be undone.
                        </p>
                        <div className="flex space-x-3 justify-center">
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors flex items-center"
                                disabled={loading}
                            >
                                {loading && (
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                )}
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CategoryManagement;