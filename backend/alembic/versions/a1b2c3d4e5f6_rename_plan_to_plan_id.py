"""rename plan column to plan_id in members table

Revision ID: a1b2c3d4e5f6
Revises: ee0965c33452
Create Date: 2026-06-10 12:00:00.000000

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'a1b2c3d4e5f6'
down_revision = 'ee0965c33452'
branch_labels = None
depends_on = None


def upgrade():
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    
    # Check if members table exists and has plan column
    if 'members' in inspector.get_table_names():
        columns = [col['name'] for col in inspector.get_columns('members')]
        
        # If plan column exists and plan_id doesn't, rename it
        if 'plan' in columns and 'plan_id' not in columns:
            op.alter_column('members', 'plan', new_column_name='plan_id')


def downgrade():
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    
    # Check if members table exists and has plan_id column
    if 'members' in inspector.get_table_names():
        columns = [col['name'] for col in inspector.get_columns('members')]
        
        # If plan_id column exists and plan doesn't, rename it back
        if 'plan_id' in columns and 'plan' not in columns:
            op.alter_column('members', 'plan_id', new_column_name='plan')
