import express from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import { supabaseAdmin } from '../config/supabaseClient.js';

const router = express.Router();

// Get current user's profile
router.get('/me', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {  // ignore "no rows" special code
      console.error(error);
      return res.status(500).json({ error: 'Failed to load profile' });
    }

    if (!data) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    return res.json(data);
  } catch (err) {
    console.error('Error in /me:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Sync profile with name + avatar from frontend
router.post('/me/sync', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { full_name, avatar_url } = req.body;

    const { data, error } = await supabaseAdmin
      .from('profiles')
      .upsert(
        {
          id: userId,
          full_name,
          avatar_url
        },
        { onConflict: 'id' }
      )
      .select()
      .single();

    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to sync profile' });
    }

    return res.json(data);
  } catch (err) {
    console.error('Error in /me/sync:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
