
    res.status(500).send("Server error");
  }
});

module.exports = router;

router.delete("/:barcode", auth, async (req, res) => {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(500).send("Server error");
    res.status(500).send("Server error");
  }
});

module.exports = router;
