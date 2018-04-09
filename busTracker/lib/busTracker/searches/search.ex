defmodule BusTracker.Searches.Search do
  use Ecto.Schema
  import Ecto.Changeset


  schema "searches" do
    field :query, :string
    field :user_id, :id

    timestamps()
  end

  @doc false
  def changeset(search, attrs) do
    search
    |> cast(attrs, [:query])
    |> validate_required([:query])
  end
end
