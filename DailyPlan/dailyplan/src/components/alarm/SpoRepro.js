import React, { useState, useEffect } from 'react';
import { getAuthUrl, getToken } from '../../utils/validations/spotifyAuth';
import axios from 'axios';

const SpotifyPlayer = ({ mediaLink }) => {
    const [token, setToken] = useState(null);
    const [isPaused, setIsPaused] = useState(true);
    const [isRepeating, setIsRepeating] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (code) {
            getToken(code).then(data => {
                setToken(data.access_token);
                checkPlaybackState(data.access_token);
            });
        } else {
            getAuthUrl().then(url => {
                window.location.href = url;
            });
        }
    }, []);

    const checkPlaybackState = async (accessToken) => {
        try {
            const response = await axios.get('https://api.spotify.com/v1/me/player', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setIsPaused(!response.data.is_playing);
            setIsRepeating(response.data.repeat_state === 'track');
        } catch (error) {
            console.error('Error fetching playback state:', error);
        }
    };

    const togglePlayPause = async () => {
        if (token) {
            try {
                await axios.put(
                    `https://api.spotify.com/v1/me/player/${isPaused ? 'play' : 'pause'}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setIsPaused(!isPaused);
            } catch (error) {
                console.error(`Error ${isPaused ? 'resuming' : 'pausing'} playback:`, error);
            }
        }
    };

    const toggleRepeat = async () => {
        if (token) {
            try {
                await axios.put(
                    'https://api.spotify.com/v1/me/player/repeat',
                    { state: isRepeating ? 'off' : 'track' },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setIsRepeating(!isRepeating);
            } catch (error) {
                console.error('Error toggling repeat:', error);
            }
        }
    };

    if (!mediaLink.includes('spotify.com')) {
        return <p>El enlace proporcionado no es válido</p>;
    }

    return (
        <div>
            <iframe
                src={`https://open.spotify.com/embed/track/${mediaLink.split('track/')[1]}`}
                width="300"
                height="80"
                frameBorder="0"
                allowTransparency="true"
                allow="encrypted-media"
            ></iframe>
            <div>
                <button onClick={togglePlayPause}>
                    {isPaused ? 'Reanudar' : 'Pausar'}
                </button>
                <button onClick={toggleRepeat}>
                    {isRepeating ? 'Desactivar Repetición' : 'Activar Repetición'}
                </button>
            </div>
        </div>
    );
};

export default SpotifyPlayer;
