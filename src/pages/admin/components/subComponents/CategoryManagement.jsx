import React, { useState, useEffect } from 'react';

function CategoryManagement() {
    // Sample categories data (replace with actual API calls)
    const [categories, setCategories] = useState([
        { id: 1, name: 'Tonkotsu Ramen', description: 'Pork bone broth ramen', active: true, products: 24 },
        { id: 2, name: 'Shoyu Ramen', description: 'Soy sauce based ramen', active: true, products: 18 },
        { id: 3, name: 'Miso Ramen', description: 'Miso paste flavored ramen', active: true, products: 15 },
        { id: 4, name: 'Shio Ramen', description: 'Salt based clear broth ramen', active: true, products: 12 },
        { id: 5, name: 'Tsukemen', description: 'Dipping ramen noodles', active: false, products: 8 },
        { id: 6, name: 'Vegetarian Ramen', description: 'Plant-based ramen options', active: true, products: 10 },
        { id: 7, name: 'Spicy Ramen', description: 'Hot and spicy ramen varieties', active: true, products: 14 },
    ]);

    // State for the form
    const [formData, setFormData] = useState({
        id: null,
        name: '',
        description: '',
        active: true
    });
    
    // UI states
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showConfirmDelete, setShowConfirmDelete] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    // Filter categories based on search term
    const filteredCategories = categories.filter(category => 
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // Reset form to default state
    const resetForm = () => {
        setFormData({ id: null, name: '', description: '', active: true });
        setIsEditing(false);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (formData.name.trim() === '') return;
        
        if (isEditing) {
            // Update existing category
            setCategories(categories.map(category => 
                category.id === formData.id ? { ...formData, products: category.products } : category
            ));
        } else {
            // Add new category
            const newId = categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1;
            setCategories([...categories, { ...formData, id: newId, products: 0 }]);
        }
        
        resetForm();
    };

    // Edit category
    const handleEdit = (category) => {
        setFormData(category);
        setIsEditing(true);
    };

    // Start delete process
    const handleDeleteClick = (category) => {
        setCategoryToDelete(category);
        setShowConfirmDelete(true);
    };

    // Confirm delete 
    const confirmDelete = () => {
        if (categoryToDelete) {
            setCategories(categories.filter(c => c.id !== categoryToDelete.id));
        }
        setShowConfirmDelete(false);
        setCategoryToDelete(null);
    };

    // Cancel delete
    const cancelDelete = () => {
        setShowConfirmDelete(false);
        setCategoryToDelete(null);
    };

    // Toggle category active status
    const toggleStatus = (id) => {
        setCategories(categories.map(category => 
            category.id === id ? { ...category, active: !category.active } : category
        ));
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-white">
                    Category <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">Management</span>
                </h2>
                <p className="text-gray-400 mt-2">
                    Add, edit, and manage product categories
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-red-500 mt-4"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Category Form */}
                <div className="col-span-1">
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 p-6">
                        <h3 className="text-lg font-semibold text-white mb-4">
                            {isEditing ? 'Edit Category' : 'Add New Category'}
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                                        Category Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md bg-gray-700/50 border border-gray-600 focus:border-yellow-500 focus:ring focus:ring-yellow-500/20 focus:ring-opacity-50 text-white py-2 px-3"
                                        placeholder="Enter category name"
                                    />
                                </div>
                                
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={3}
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md bg-gray-700/50 border border-gray-600 focus:border-yellow-500 focus:ring focus:ring-yellow-500/20 focus:ring-opacity-50 text-white py-2 px-3 resize-none"
                                        placeholder="Enter category description"
                                    ></textarea>
                                </div>
                                
                                <div className="flex items-center">
                                    <input
                                        id="active"
                                        name="active"
                                        type="checkbox"
                                        checked={formData.active}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-yellow-500 focus:ring-yellow-500/30 border-gray-600 rounded bg-gray-700"
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
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 rounded-md transition-colors"
                                    >
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
                        
                        {filteredCategories.length > 0 ? (
                            <div className="overflow-x-auto">
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
                                                <td className="px-6 py-4 whitespace-nowrap">
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
                                                        onClick={() => toggleStatus(category.id)}
                                                    >
                                                        {category.active ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <button 
                                                        onClick={() => handleEdit(category)}
                                                        className="text-yellow-500 hover:text-yellow-400 mr-3"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDeleteClick(category)}
                                                        className="text-red-500 hover:text-red-400"
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
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors"
                            >
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