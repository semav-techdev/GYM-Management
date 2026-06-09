"""add weight_records table

Revision ID: ee0965c33452
Revises:
Create Date: 2026-06-08 17:00:00.000000

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = 'ee0965c33452'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    bind = op.get_bind()
    inspector = sa.inspect(bind)

    if 'weight_records' in inspector.get_table_names():
        return

    op.create_table(
        'weight_records',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('member_id', sa.Integer(), sa.ForeignKey('members.id', ondelete='CASCADE'), nullable=False),
        sa.Column('record_date', sa.Date(), nullable=False),
        sa.Column('weight_before', sa.Float(), nullable=True),
        sa.Column('weight_after', sa.Float(), nullable=True),
        sa.UniqueConstraint('member_id', 'record_date', name='uix_member_month')
    )
    op.create_index('idx_weight_records_member_date', 'weight_records', ['member_id', 'record_date'])


def downgrade():
    bind = op.get_bind()
    inspector = sa.inspect(bind)

    if 'weight_records' in inspector.get_table_names():
        op.drop_index('idx_weight_records_member_date', table_name='weight_records')
        op.drop_table('weight_records')
