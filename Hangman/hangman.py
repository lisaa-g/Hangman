import matplotlib.pyplot as plt

def draw_hangman_stage(stage):
    fig, ax = plt.subplots(figsize=(6, 6))  # Set figure size to 6x6 inches
    ax.set_xlim(0, 6)
    ax.set_ylim(0, 6)
    ax.set_aspect('equal')
    ax.axis('off')
    
    # Base and pole
    if stage >= 1:
        ax.plot([1, 5], [1, 1], 'k-', lw=2)
    if stage >= 2:
        ax.plot([3, 3], [1, 5], 'k-', lw=2)
    if stage >= 3:
        ax.plot([3, 4.5], [5, 5], 'k-', lw=2)
    if stage >= 4:
        ax.plot([4.5, 4.5], [5, 4.5], 'k-', lw=2)

    # Head
    if stage >= 5:
        circle = plt.Circle((4.5, 4), 0.5, color='k', fill=False, lw=2)
        ax.add_patch(circle)
        
    # Body
    if stage >= 6:
        ax.plot([4.5, 4.5], [3.5, 2.5], 'k-', lw=2)
        
    # Left arm
    if stage >= 7:
        ax.plot([4.5, 4], [3.5, 3], 'k-', lw=2)
        
    # Right arm
    if stage >= 8:
        ax.plot([4.5, 5], [3.5, 3], 'k-', lw=2)
        
    # Left leg
    if stage >= 9:
        ax.plot([4.5, 4], [2.5, 2], 'k-', lw=2)
        
    # Right leg
    if stage >= 10:
        ax.plot([4.5, 5], [2.5, 2], 'k-', lw=2)
    
    # Dead face for the last stage
    if stage == 11:
        # Right leg (since the dead face is in stage 11, we ensure right leg is also there)
        ax.plot([4.5, 5], [2.5, 2], 'k-', lw=2)
        # Left eye
        ax.plot([4.35, 4.45], [4.1, 3.9], 'k-', lw=2)
        ax.plot([4.35, 4.45], [3.9, 4.1], 'k-', lw=2)
        # Right eye
        ax.plot([4.55, 4.65], [4.1, 3.9], 'k-', lw=2)
        ax.plot([4.55, 4.65], [3.9, 4.1], 'k-', lw=2)
        # Mouth
        ax.plot([4.35, 4.65], [3.75, 3.75], 'k-', lw=2)
    
    plt.savefig(f'hangman_stage_{stage}.png', bbox_inches='tight')
    plt.close()

# Draw and save all stages
for stage in range(1, 12):
    draw_hangman_stage(stage)
