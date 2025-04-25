import { useState, useEffect } from 'react';
import { IonApp, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonInput, IonLabel, IonModal, IonFooter, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonAlert, IonText, IonAvatar, IonCol, IonGrid, IonRow, IonIcon, IonPopover } from '@ionic/react';
import { User } from '@supabase/supabase-js';
import  supabase  from '../utils/supabaseClient';
import { colorFill, pencil, trash } from 'ionicons/icons';
import { heartOutline, chatbubbleOutline, shareSocialOutline, images, playCircle } from 'ionicons/icons';
import { personAddOutline, happyOutline } from 'ionicons/icons';


interface Post {
  post_id: string;
  user_id: number;
  username: string;
  avatar_url: string;
  post_content: string;
  post_created_at: string;
  post_updated_at: string;
}

const FeedContainer = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postContent, setPostContent] = useState('');
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [popoverState, setPopoverState] = useState<{ open: boolean; event: Event | null; postId: string | null }>({ open: false, event: null, postId: null });

  useEffect(() => {
    const fetchUser = async () => {
      const { data: authData } = await supabase.auth.getUser();
      if (authData?.user?.email?.endsWith('@nbsc.edu.ph')) {
        setUser(authData.user);
        const { data: userData, error } = await supabase
          .from('users')
          .select('user_id, username, user_avatar_url')
          .eq('user_email', authData.user.email)
          .single();
        if (!error && userData) {
          setUser({ ...authData.user, id: userData.user_id });
          setUsername(userData.username);
        }
      }
    };
    const fetchPosts = async () => {
      const { data, error } = await supabase.from('posts').select('*').order('post_created_at', { ascending: false });
      if (!error) setPosts(data as Post[]);
    };
    fetchUser();
    fetchPosts();
  }, []);

  const createPost = async () => {
    if (!postContent || !user || !username) return;
  
    // Fetch avatar URL
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('user_avatar_url')
      .eq('user_id', user.id)
      .single();
  
    if (userError) {
      console.error('Error fetching user avatar:', userError);
      return;
    }
  
    const avatarUrl = userData?.user_avatar_url || 'https://ionicframework.com/docs/img/demos/avatar.svg';
  
    // Insert post with avatar URL
    const { data, error } = await supabase
      .from('posts')
      .insert([
        { post_content: postContent, user_id: user.id, username, avatar_url: avatarUrl }
      ])
      .select('*');
  
    if (!error && data) {
      setPosts([data[0] as Post, ...posts]);
    }
  
    setPostContent('');
  };

  const deletePost = async (post_id: string) => {
    await supabase.from('posts').delete().match({ post_id });
    setPosts(posts.filter(post => post.post_id !== post_id));
  };

  const startEditingPost = (post: Post) => {
    setEditingPost(post);
    setPostContent(post.post_content);
    setIsModalOpen(true);
  };

  const savePost = async () => {
    if (!postContent || !editingPost) return;
    const { data, error } = await supabase
      .from('posts')
      .update({ post_content: postContent })
      .match({ post_id: editingPost.post_id })
      .select('*');
    if (!error && data) {
      const updatedPost = data[0] as Post;
      setPosts(posts.map(post => (post.post_id === updatedPost.post_id ? updatedPost : post)));
      setPostContent('');
      setEditingPost(null);
      setIsModalOpen(false);
      setIsAlertOpen(true);
    }
  };

  return (
    <>
      <IonContent style={{
       '--background': 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
'--ion-item-background': 'rgba(204, 35, 102, 0.7)', /* #cc2366 with opacity */
'--ion-toolbar-background': 'rgba(220, 39, 67, 0.8)'  /* #dc2743 with opacity */


      }}>
        {user ? (
          <>
            <IonCard style={{
  margin: '16px',
  borderRadius: '16px',
  background: 'rgba(255, 240, 240, 0.8)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 4px 20px rgba(100, 100, 100, 0.15)',
  border: '1px solid rgba(200, 200, 200, 0.2)'
}}>
  <IonCardHeader style={{
    borderBottom: '1px solid rgba(200, 200, 200, 0.2)',
    paddingBottom: '12px'
  }}>
    <IonCardTitle style={{
      color: 'black',
      fontWeight: '600',
      fontSize: '1.4rem'
    }}>Create Post</IonCardTitle>
  </IonCardHeader>
  
  <IonCardContent style={{ paddingTop: '16px' }}>
    <IonInput
      style={{
        '--background': 'rgba(255, 255, 255, 0.7)',
        '--border-radius': '12px',
        '--padding-start': '12px',
        '--placeholder-color': '#aaa',
        '--color': 'black'
      }}
      value={postContent}
      onIonChange={e => setPostContent(e.detail.value!)}
      placeholder="What's on your mind?"
    />
  </IonCardContent>
  
  {/* Icon options row */}
  <div style={{
    display: 'flex',
    justifyContent: 'space-around',
    padding: '8px 16px',
    borderTop: '1px solid rgba(200, 200, 200, 0.2)'
  }}>
    <IonButton 
      fill="clear"
      style={{
        '--padding-start': '4px',
        '--padding-end': '4px',
        '--color': '#666'
      }}
    >
      <IonIcon icon={images} style={{ fontSize: '1.4rem', marginRight: '4px', color: '#45BD62' }} />
      <span style={{ fontSize: '0.9rem' }}>Photo</span>
    </IonButton>
    
    <IonButton 
      fill="clear"
      style={{
        '--padding-start': '4px',
        '--padding-end': '4px',
        '--color': '#666'
      }}
    >
      <IonIcon icon={personAddOutline} style={{ fontSize: '1.4rem', marginRight: '4px', color: '#1877F2' }} />
      <span style={{ fontSize: '0.9rem' }}>Tag People</span>
    </IonButton>
    
    <IonButton 
      fill="clear"
      style={{
        '--padding-start': '4px',
        '--padding-end': '4px',
        '--color': '#666'
      }}
    >
      <IonIcon icon={happyOutline} style={{ fontSize: '1.4rem', marginRight: '4px', color: '#F7B928' }} />
      <span style={{ fontSize: '0.9rem' }}>Feeling/Activity</span>
    </IonButton>
  </div>
  
  <div style={{ 
    display: 'flex', 
    justifyContent: 'flex-end', 
    padding: '0.5rem',
    borderTop: '1px solid rgba(200, 200, 200, 0.2)'
  }}>
    <IonButton 
      onClick={createPost}
      style={{
        '--background': 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
        '--background-hover': 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
        '--background-activated': 'linear-gradient(135deg, #fad0c4 0%, #ff9a9e 100%)',
        '--border-radius': '12px',
        '--box-shadow': '0 2px 10px rgba(100, 100, 100, 0.1)',
        '--color': 'white',
        margin: '8px',
        fontWeight: '600'
      }}
    >
      Post
    </IonButton>
  </div>
</IonCard>
  
            {posts.map(post => (
              <IonCard key={post.post_id} style={{ 
                margin: '16px',
                marginTop: '2rem',
                borderRadius: '16px',
                background: 'rgba(255, 240, 240, 0.8)',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 4px 20px rgba(100, 100, 100, 0.15)', // Changed to gray shadow
                border: '1px solid rgba(200, 200, 200, 0.2)' // Lighter border
              }}>
                <IonCardHeader style={{
                  borderBottom: '1px solid rgba(200, 200, 200, 0.2)', // Lighter border
                  padding: '12px 16px'
                }}>
                  <IonRow>
                    <IonCol size="1.85">
                      <IonAvatar style={{
                        width: '48px',
                        height: '48px',
                        border: '2px solid rgba(200, 200, 200, 0.3)' // Lighter border
                      }}>
                        <img alt={post.username} src={post.avatar_url} />
                      </IonAvatar>
                    </IonCol>
                    <IonCol>
                      <IonCardTitle style={{ 
                        marginTop: '10px',
                        color: 'black', // Changed to black
                        fontWeight: '600'
                      }}>{post.username}</IonCardTitle>
                      <IonCardSubtitle style={{
                        color: '#666', // Darker gray
                        fontSize: '0.8rem'
                      }}>{new Date(post.post_created_at).toLocaleString()}</IonCardSubtitle>
                    </IonCol>
                    <IonCol size="auto">
                      <IonButton
                        fill="clear"
                        style={{
                          '--padding-start': '0',
                          '--padding-end': '0',
                          '--ripple-color': 'transparent'
                        }}
                        onClick={(e) =>
                          setPopoverState({
                            open: true,
                            event: e.nativeEvent,
                            postId: post.post_id,
                          })
                        }
                      >
                        <IonIcon 
                          icon={pencil} 
                          style={{
                            color: '#666', // Darker gray
                            fontSize: '1.2rem'
                          }} 
                        />
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonCardHeader>
  
                <IonCardContent style={{ padding: '16px' }}>
                  <IonText style={{ 
                    color: 'black', // Changed to black
                    lineHeight: '1.5'
                  }}>
                    <p style={{ 
                      margin: 0,
                      fontSize: '1rem',
                      whiteSpace: 'pre-wrap'
                    }}>{post.post_content}</p>
                  </IonText>
                </IonCardContent>
                {/* INSERT ACTION BUTTONS HERE */}
<div style={{
  display: 'flex',
  justifyContent: 'space-around',
  padding: '8px 16px',
  borderTop: '1px solid rgba(200, 200, 200, 0.2)'
}}>
  <IonButton 
    fill="clear" 
    style={{
      '--padding-start': '4px',
      '--padding-end': '4px',
      '--color': '#666'
    }}
  >
    <IonIcon icon={heartOutline} style={{ fontSize: '1.4rem', marginRight: '4px' }} />
    <span style={{ fontSize: '0.9rem' }}>Like</span>
  </IonButton>
  
  <IonButton 
    fill="clear" 
    style={{
      '--padding-start': '4px',
      '--padding-end': '4px',
      '--color': '#666'
    }}
  >
    <IonIcon icon={chatbubbleOutline} style={{ fontSize: '1.4rem', marginRight: '4px' }} />
    <span style={{ fontSize: '0.9rem' }}>Comment</span>
  </IonButton>
  
  <IonButton 
    fill="clear" 
    style={{
      '--padding-start': '4px',
      '--padding-end': '4px',
      '--color': '#666'
    }}
  >
    <IonIcon icon={shareSocialOutline} style={{ fontSize: '1.4rem', marginRight: '4px' }} />
    <span style={{ fontSize: '0.9rem' }}>Share</span>
  </IonButton>
</div>
{/* END OF ACTION BUTTONS INSERTION */}
  
                <IonPopover
                  isOpen={popoverState.open && popoverState.postId === post.post_id}
                  event={popoverState.event}
                  onDidDismiss={() =>
                    setPopoverState({ open: false, event: null, postId: null })
                  }
                  style={{
                    '--background': 'rgba(255, 240, 240, 0.95)',
                    '--box-shadow': '0 4px 20px rgba(100, 100, 100, 0.15)', // Gray shadow
                    '--border-radius': '12px',
                    '--backdrop-filter': 'blur(10px)'
                  }}
                >
                  <IonButton
                    fill="clear"
                    style={{
                      '--color': 'black', // Changed to black
                      '--background-hover': 'rgba(200, 200, 200, 0.1)', // Lighter hover
                      width: '100%',
                      justifyContent: 'flex-start',
                      paddingLeft: '16px'
                    }}
                    onClick={() => {
                      startEditingPost(post);
                      setPopoverState({ open: false, event: null, postId: null });
                    }}
                  >
                    Edit
                  </IonButton>
                  <IonButton
                    fill="clear"
                    color="danger"
                    style={{
                      '--color': '#ff4757',
                      '--background-hover': 'rgba(200, 200, 200, 0.1)', // Lighter hover
                      width: '100%',
                      justifyContent: 'flex-start',
                      paddingLeft: '16px'
                    }}
                    onClick={() => {
                      deletePost(post.post_id);
                      setPopoverState({ open: false, event: null, postId: null });
                    }}
                  >
                    Delete
                  </IonButton>
                </IonPopover>
              </IonCard>
            ))}
          </>
        ) : (
          <IonLabel style={{
            display: 'block',
            textAlign: 'center',
            marginTop: '50%',
            color: 'black', // Changed to black
            fontSize: '1.2rem'
          }}>Loading...</IonLabel>
        )}
      </IonContent>
  
      <IonModal isOpen={isModalOpen} onDidDismiss={() => setIsModalOpen(false)}>
        <IonHeader style={{
          background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)'
        }}>
          <IonToolbar>
            <IonTitle style={{
              color: 'white',
              fontWeight: '600',
              textAlign: 'center'
            }}>Edit Post</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent style={{
          '--background': 'rgba(255, 240, 240, 0.9)',
          padding: '16px'
        }}>
          <IonInput
            style={{
              '--background': 'rgba(255, 255, 255, 0.8)',
              '--border-radius': '12px',
              '--padding-start': '12px',
              '--placeholder-color': '#aaa',
              '--color': 'black', // Changed to black
              marginBottom: '16px'
            }}
            value={postContent}
            onIonChange={e => setPostContent(e.detail.value!)}
            placeholder="Edit your post..."
          />
        </IonContent>
        <IonFooter style={{
          background: 'transparent',
          padding: '8px 16px',
          borderTop: '1px solid rgba(200, 200, 200, 0.2)' // Lighter border
        }}>
          <IonButton 
            onClick={savePost}
            style={{
              '--background': 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
              '--background-hover': 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
              '--background-activated': 'linear-gradient(135deg, #fad0c4 0%, #ff9a9e 100%)',
              '--border-radius': '12px',
              '--box-shadow': '0 2px 10px rgba(100, 100, 100, 0.1)', // Gray shadow
              '--color': 'white',
              marginRight: '8px',
              fontWeight: '600'
            }}
          >
            Save
          </IonButton>
          <IonButton 
            onClick={() => setIsModalOpen(false)}
            style={{
              '--background': 'rgba(255, 255, 255, 0.8)',
              '--background-hover': 'rgba(255, 255, 255, 0.9)',
              '--color': 'black', // Changed to black
              '--border-radius': '12px',
              '--box-shadow': '0 2px 10px rgba(100, 100, 100, 0.1)', // Gray shadow
              fontWeight: '600'
            }}
          >
            Cancel
          </IonButton>
        </IonFooter>
      </IonModal>
  
      <IonAlert
        isOpen={isAlertOpen}
        onDidDismiss={() => setIsAlertOpen(false)}
        header="Success"
        message="Post updated successfully!"
        buttons={['OK']}
        style={{
          '--background': 'rgba(255, 240, 240, 0.95)',
          '--backdrop-filter': 'blur(10px)',
          '--box-shadow': '0 4px 20px rgba(100, 100, 100, 0.15)', // Gray shadow
          '--border-radius': '16px',
          '--header-color': 'black', // Changed to black
          '--message-color': '#333' // Darker gray
        }}
      />
    </>
  );
};

export default FeedContainer;