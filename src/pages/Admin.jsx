import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './Admin.css';

const Admin = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        image: '',
        price: '',
        originalPrice: '',
        discount: '',
        genre: '',
        categories: '',
        rating: 4.5,
        ratingCount: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            // Clean up categories (comma-separated string to array)
            const categoriesArray = formData.categories
                .split(',')
                .map(cat => cat.trim().toLowerCase())
                .filter(cat => cat !== '');

            const gameData = {
                ...formData,
                price: parseFloat(formData.price) || 0,
                originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
                rating: parseFloat(formData.rating) || 4.5,
                ratingCount: parseInt(formData.ratingCount) || 0,
                categories: categoriesArray,
                createdAt: serverTimestamp()
            };

            await addDoc(collection(db, 'games'), gameData);
            
            setMessage({ type: 'success', text: 'Game added successfully to the backend!' });
            setFormData({
                id: '',
                title: '',
                image: '',
                price: '',
                originalPrice: '',
                discount: '',
                genre: '',
                categories: '',
                rating: 4.5,
                ratingCount: 0
            });
        } catch (error) {
            console.error("Error adding game: ", error);
            setMessage({ type: 'error', text: 'Error: ' + error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-glass-card">
                <h1 className="admin-title">Arsenal Admin Panel</h1>
                <p className="admin-subtitle">Update your game store without touching a single line of code.</p>
                
                {message.text && (
                    <div className={`alert ${message.type}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="form-grid">
                        <div className="form-group">
                            <label>Internal ID (e.g., spider-man-2)</label>
                            <input 
                                type="text" name="id" value={formData.id} 
                                onChange={handleChange} required placeholder="Unique slug"
                            />
                        </div>
                        <div className="form-group">
                            <label>Game Title</label>
                            <input 
                                type="text" name="title" value={formData.title} 
                                onChange={handleChange} required placeholder="Full display title"
                            />
                        </div>
                        <div className="form-group">
                            <label>Image Path / URL</label>
                            <input 
                                type="text" name="image" value={formData.image} 
                                onChange={handleChange} required placeholder="assets/game.jpg"
                            />
                        </div>
                        <div className="form-group">
                            <label>Price ($)</label>
                            <input 
                                type="number" step="0.01" name="price" value={formData.price} 
                                onChange={handleChange} required placeholder="59.99"
                            />
                        </div>
                        <div className="form-group">
                            <label>Original Price (Optional)</label>
                            <input 
                                type="number" step="0.01" name="originalPrice" value={formData.originalPrice} 
                                onChange={handleChange} placeholder="79.99"
                            />
                        </div>
                        <div className="form-group">
                            <label>Discount Text (e.g., 20%)</label>
                            <input 
                                type="text" name="discount" value={formData.discount} 
                                onChange={handleChange} placeholder="Optional"
                            />
                        </div>
                        <div className="form-group">
                            <label>Genre</label>
                            <input 
                                type="text" name="genre" value={formData.genre} 
                                onChange={handleChange} placeholder="Action, Adventure"
                            />
                        </div>
                        <div className="form-group">
                            <label>Categories (comma separated)</label>
                            <input 
                                type="text" name="categories" value={formData.categories} 
                                onChange={handleChange} placeholder="rpg, action, open-world"
                            />
                        </div>
                    </div>

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Adding Game...' : 'Add Game to Cloud'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Admin;
